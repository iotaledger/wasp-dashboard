import React, { useState } from "react";
import { Dialog } from "../";

interface IDeletePeerDialog {
    onClose: () => void;
    deletePeer: () => Promise<void>;
}

const DeletePeerDialog: React.FC<IDeletePeerDialog> = ({ onClose, deletePeer }) => {
    const [isBusy, setIsBusy] = useState<boolean>(false);

    /**
     * Delete the peer.
     */
    async function handleDeletePeer(): Promise<void> {
        setIsBusy(true);
        await deletePeer();
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
                        onClick={handleDeletePeer}
                        disabled={isBusy}
                    >
                        Yes
                    </button>
                    <button type="button" className="button button--secondary" onClick={onClose}>
                        No
                    </button>
                </React.Fragment>
            }
        >
            <p className="margin-t-t">Are you sure you want to delete the peer? </p>
        </Dialog>
    );
};

export default DeletePeerDialog;
