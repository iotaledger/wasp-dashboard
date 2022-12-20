import React, { SetStateAction, useEffect, useState } from "react";
import { Dialog } from "../";
import { ServiceFactory } from "../../../factories/serviceFactory";
import { ChangeUserPasswordRequest, User } from "../../../services/wasp_client";
import { WaspClientService } from "../../../services/waspClientService";
import PasswordInput from "../layout/PasswordInput";
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
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    /**
     *
     */
    async function handleEditUser(): Promise<void> {
        setError(null);
        try {
            const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
            await waspClientService.users().changeUserPassword({
                ...user,
                updateUserPasswordRequest: { password: confirmPassword },
            } as ChangeUserPasswordRequest);
            if (onSuccess && typeof onSuccess === "function") {
                onSuccess();
            }
            onClose();
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

    useEffect(() => {
        if (confirmPassword !== "" && confirmPassword !== newPassword) {
            setError("Passwords do not match!");
        } else {
            setError(null);
        }
    }, [confirmPassword, newPassword]);
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
                        disabled={isBusy || confirmPassword !== newPassword || confirmPassword === ""}
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
                        inputValue={confirmPassword}
                        onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setConfirmPassword(e.target.value)}
                        disabled={isBusy}
                    />

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
