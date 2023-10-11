import React, { useState } from "react";
import { Dialog } from "../";
import { User, WaspClientService, ServiceFactory } from "../../../lib";

interface IDeleteUserDialog {
    onClose: () => void;
    user: User;
    onError?: () => void;
    onSuccess?: () => void;
}

const DeleteUserDialog: React.FC<IDeleteUserDialog> = ({ onClose, user, onSuccess, onError }) => {
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Delete the user.
     */
    async function handleDeleteUser(): Promise<void> {
        setIsBusy(true);
        setError(null);
        try {
            const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
            await waspClientService.users().deleteUser(user.username);
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
        }
        setIsBusy(false);
    }
    return (
        <Dialog
            title="Delete Confirmation"
            onClose={onClose}
            actions={
                <React.Fragment>
                    <button
                        type="button"
                        className="button button--primary"
                        onClick={handleDeleteUser}
                        disabled={isBusy}
                    >
                        Yes
                    </button>
                    <button type="button" className="button button--secondary" disabled={isBusy} onClick={onClose}>
                        No
                    </button>
                </React.Fragment>
            }
        >
            <p className="margin-t-t">Are you sure you want to delete the user? </p>
            {error && <p className="dialog--error">{error}</p>}
        </Dialog>
    );
};

DeleteUserDialog.defaultProps = {
    onError: () => {},
    onSuccess: () => {},
};
export default DeleteUserDialog;
