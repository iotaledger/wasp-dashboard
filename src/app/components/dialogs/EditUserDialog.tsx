/* eslint-disable jsdoc/require-jsdoc */
import React, { SetStateAction, useMemo, useState } from "react";
import { ServiceFactory, WaspClientService, User, UserPermission, AuthService } from "../../../lib";
import { validatePassword } from "../../../lib/utils";
import { Dialog, PasswordInput, Toggle } from "../../components";

enum PasswordValidation {
    Error,
    Empty,
    Valid,
}

interface IEditUserDialog {
    onClose: () => void;
    user: User;
    onError?: () => void;
    onSuccess?: () => void;
}

const EditUserDialog: React.FC<IEditUserDialog> = ({ onClose, user, onSuccess, onError }) => {
    const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
    const authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);

    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string>("");
    const [permissions, setPermissions] = useState<string[] | undefined>(user.permissions ? [...user.permissions] : []);
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

    const editingMySelf = authService.getUsername() === user.username;

    const [passwordValidation, permissionsAreValid] = useMemo(() => {
        // Check if both passwords are valid
        const passwordCheck = (() => {
            if (confirmNewPassword.length === 0 && newPassword.length === 0) {
                setError(null);
                return PasswordValidation.Empty;
            }
            if (confirmNewPassword === newPassword) {
                const result = validatePassword(newPassword);
                if (typeof result === "string") {
                    setError(result);
                    return PasswordValidation.Error;
                }
                setError(null);
                return PasswordValidation.Valid;
            }
            setError("Passwords do not match!");
            return PasswordValidation.Error;
        })();
        // Check if permissions are different
        const permissionsCheck = (() => {
            if (!Array.isArray(permissions) || !Array.isArray(user.permissions)) {
                return false;
            }
            return !(
                user.permissions?.every(p => permissions.includes(p)) &&
                permissions.length === user.permissions.length
            );
        })();
        return [passwordCheck, permissionsCheck];
    }, [confirmNewPassword, newPassword, permissions, user]);

    const setWritePermission = (isCurrentlyEnabled: boolean) => {
        const permission = UserPermission.Write;
        if (isCurrentlyEnabled) {
            // Eisable
            setPermissions(permissions?.filter(p => p !== permission));
        } else {
            // Enable
            setPermissions([...(permissions ?? []), permission]);
        }
    };

    async function handleEditUser(): Promise<void> {
        setError(null);
        try {
            await Promise.all([
                // Update the password if has changed and is valid
                passwordValidation === PasswordValidation.Valid
                    ? waspClientService.users().changeUserPassword(user.username, { password: confirmNewPassword })
                    : Promise.resolve(),

                // Update the permissions if have changed
                permissionsAreValid
                    ? waspClientService.users().changeUserPermissions(user.username, { permissions: permissions ?? [] })
                    : Promise.resolve(),
            ]);

            if (onSuccess && typeof onSuccess === "function") {
                onSuccess();
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            if (onError && typeof onError === "function") {
                onError();
            }
        } finally {
            setIsBusy(false);
        }
    }

    const isWritePermissionEnabled = permissions?.includes(UserPermission.Write) ?? false;

    const formIsValid =
        passwordValidation === PasswordValidation.Valid ||
        (passwordValidation === PasswordValidation.Empty && permissionsAreValid);

    return (
        <Dialog
            onClose={onClose}
            title="Edit user"
            actions={
                <React.Fragment>
                    <button
                        type="button"
                        className="button button--primary"
                        onClick={handleEditUser}
                        disabled={isBusy || !formIsValid}
                    >
                        Save
                    </button>
                    <button type="button" className="button button--secondary" disabled={isBusy} onClick={onClose}>
                        Cancel
                    </button>
                </React.Fragment>
            }
        >
            <React.Fragment>
                <p>Please enter a new password.</p>
                <div className="dialog-content-label">New password</div>
                <div className="dialog-content-value">
                    <PasswordInput
                        inputValue={newPassword}
                        onChange={(e: { target: { value: SetStateAction<string> } }) => setNewPassword(e.target.value)}
                        disabled={isBusy}
                    />
                </div>
                <div className="dialog-content-label">Repeat new password</div>
                <div className="dialog-content-value">
                    <PasswordInput
                        inputValue={confirmNewPassword}
                        onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setConfirmNewPassword(e.target.value)}
                        disabled={isBusy}
                    />
                    <div className="dialog-content-label">Permissions</div>
                    <div className="dialog-content-value">
                        <Toggle
                            disabled={editingMySelf}
                            active={isWritePermissionEnabled}
                            onToggle={setWritePermission}
                            rightLabel="Write"
                        />
                    </div>
                    {error && <p className="dialog-content-error">{error}</p>}
                </div>
            </React.Fragment>
        </Dialog>
    );
};

EditUserDialog.defaultProps = {
    onError: () => {},
    onSuccess: () => {},
};
export default EditUserDialog;
