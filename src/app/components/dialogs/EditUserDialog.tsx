import React, { SetStateAction, useState } from "react";
import { Dialog } from "../";
import { EyeIcon, EyeClosedIcon } from "../../../assets";
import { ServiceFactory } from "../../../factories/serviceFactory";
import { ChangeUserPasswordRequest, User } from "../../../services/wasp_client";
import { WaspClientService } from "../../../services/waspClientService";
interface IEditUserDialog {
    onClose: () => void;
    user: User;
}

const EditUserDialog: React.FC<IEditUserDialog> = ({ onClose, user }) => {
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [blindMode, setBlindMode] = useState<boolean>(true);
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
            onClose();
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setIsBusy(false);
        }
    }
    /**
     * Toggle the blind mode.
     */
    function toggleBlindMode(): void {
        setBlindMode(!blindMode);
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
                        disabled={isBusy || confirmPassword !== newPassword || confirmPassword === ""}
                    >
                        Edit
                    </button>
                    <button type="button" className="button button--secondary" disabled={isBusy} onClick={onClose}>
                        Cancel
                    </button>
                </React.Fragment>
            }
        >
            <React.Fragment>
                <p>Please enter a new password.</p>
                <div className="dialog--label">New password</div>
                <div className="dialog--value">
                    <input
                        type={blindMode ? "password" : "text"}
                        className="input--stretch"
                        placeholder="e.g. user1"
                        name="username"
                        value={newPassword}
                        disabled={isBusy}
                        onChange={(e: { target: { value: SetStateAction<string> } }) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        onClick={toggleBlindMode}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "-5px",
                            transform: "translateY(50%)",
                            border: "none",
                            background: "transparent",
                            color: "var(--text-color-secondary)",
                        }}
                    >
                        {blindMode ? <EyeClosedIcon /> : <EyeIcon />}
                    </button>
                </div>
                <div className="dialog--label">Repeat new password</div>
                <div className="dialog--value">
                    <input
                        type={blindMode ? "password" : "text"}
                        className="input--stretch"
                        placeholder="e.g. user1"
                        name="username"
                        value={confirmPassword}
                        disabled={isBusy}
                        onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setConfirmPassword(e.target.value)
                        }
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        onClick={toggleBlindMode}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "-5px",
                            transform: "translateY(50%)",
                            border: "none",
                            background: "transparent",
                            color: "var(--text-color-secondary)",
                        }}
                    >
                        {blindMode ? <EyeClosedIcon /> : <EyeIcon />}
                    </button>
                    {confirmPassword !== "" && confirmPassword !== newPassword && (
                        <p className="dialog--error">Passwords do not match!</p>
                    )}
                    {error && <p className="dialog--error">{error}</p>}
                </div>
            </React.Fragment>
        </Dialog>
    );
};

export default EditUserDialog;
