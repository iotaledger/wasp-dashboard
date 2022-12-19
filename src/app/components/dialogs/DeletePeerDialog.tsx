import React, { useState } from "react";
import { Dialog } from "../";
import { ServiceFactory } from "../../../factories/serviceFactory";
import { PeersService } from "../../../services/peersService";
import { PeeringNodeStatusResponse } from "../../../services/wasp_client";

interface IDeletePeerDialog {
    onClose: () => void;
    peer: PeeringNodeStatusResponse;
}

const DeletePeerDialog: React.FC<IDeletePeerDialog> = ({ onClose, peer }) => {
    /**
     * The peers service.
     */
    const peerService: PeersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Delete the peer.
     */
    async function handleDeletePeer(): Promise<void> {
        setIsBusy(true);
        setError(null);
        try {
            const success = await peerService.distrustPeer(peer);
            if (!success) {
                throw new Error("Failed to delete peer");
            }
            onClose();
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
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
                        onClick={handleDeletePeer}
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
            <p className="margin-t-t">Are you sure you want to delete the peer? </p>
            {error && <p className="dialog-content-error">{error}</p>}
        </Dialog>
    );
};

export default DeletePeerDialog;
