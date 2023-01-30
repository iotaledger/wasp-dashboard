/* eslint-disable jsdoc/require-jsdoc */
import React, { SetStateAction, useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import {
    ServiceFactory,
    WaspClientService,
    ChangeUserPasswordRequest,
    User,
    MIN_PASSWORD_STRENGTH,
    ChangeUserPermissionsRequest,
    Permissions,
} from "../../../lib";
import { Dialog, PasswordInput } from "../../components";

interface IEditUserDialog {
    onClose: () => void;
    user: User;
    onError?: () => void;
    onSuccess?: () => void;
}

const EditUserDialog: React.FC<IEditUserDialog> = ({ onClose, user, onSuccess, onError }) => {
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [validForm, setValidForm] = useState<boolean>(false);
    const [permissions, setPermissions] = useState<string[] | undefined>();

    useEffect(() => {
        validatePasswords();
    }, [confirmNewPassword, newPassword]);

    function validatePasswords(): void {
        if (confirmNewPassword?.length <= 0 || newPassword?.length <= 0) {
            setValidForm(false);
        } else if (confirmNewPassword === newPassword) {
            const passwordStrength = zxcvbn(newPassword);
            if (passwordStrength.score < MIN_PASSWORD_STRENGTH) {
                setValidForm(false);
                setError(passwordStrength.feedback.suggestions.join(" "));
            } else {
                setValidForm(true);
                setError(null);
            }
        } else {
            setError("Passwords do not match!");
            setValidForm(true);
        }
    }
    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const permission = e.target.value as Permissions;
        if (e.target.checked) {
            setPermissions([...(permissions ?? []), permission]);
        } else {
            setPermissions(permissions?.filter(p => p !== permission));
        }
    };

    async function handleEditUser(): Promise<void> {
        setError(null);
        try {
            const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
            await waspClientService.users().changeUserPassword({
                ...user,
                updateUserPasswordRequest: { password: confirmNewPassword },
            } as ChangeUserPasswordRequest);

            await waspClientService.users().changeUserPermissions({
                ...user,
                updateUserPermissionsRequest: { permissions: permissions ?? [] },
            } as ChangeUserPermissionsRequest);

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
                        disabled={isBusy || !validForm}
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
                    <div className="dialog-content-label">Check permissions</div>
                    <div className="dialog-content-value">
                        {Object.values(Permissions).map(permission => (
                            <div key={permission} className="row middle">
                                <input
                                    type="checkbox"
                                    value={permission}
                                    onChange={handlePermissionChange}
                                    checked={permissions?.includes(permission)}
                                />
                                <span className="margin-l-t">{permission}</span>
                            </div>
                        ))}
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
