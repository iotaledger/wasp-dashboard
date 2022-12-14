import React, { useState } from "react";
import { Dialog } from "../";
import { ServiceFactory } from "../../../factories/serviceFactory";
import { PeersService } from "../../../services/peersService";
import { PeeringTrustRequest } from "../../../services/wasp_client";

interface IDialogState {
    publicKey: string;
    netID: string;
    isBusy: boolean;
}

const DIALOG_INITIAL_STATE: IDialogState = {
    publicKey: "",
    netID: "",
    isBusy: false,
};

interface IAddPeerDialog {
    onClose: () => void;
}

const AddPeerDialog: React.FC<IAddPeerDialog> = ({ onClose }) => {
    const [dialog, setDialog] = useState<IDialogState>(DIALOG_INITIAL_STATE);
    const [error, setError] = useState<string | null>(null);

    /**
     * The peers service.
     */
    const peersService: PeersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    /**
     * Handle add new peer.
     */
    async function handleAddPeer(): Promise<void> {
        setError(null);
        try {
            setDialog({ ...dialog, isBusy: true });
            const newPeer: PeeringTrustRequest = {
                publicKey: dialog.publicKey,
                netID: dialog.netID,
            };
            const success = await peersService.trustPeer(newPeer);
            if (!success) {
                setDialog({ ...dialog, isBusy: false });
                throw new Error("Failed to add peer");
            }
            onClose();
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
        setDialog({ ...dialog, isBusy: false });
    }

    /**
     * Handle the change of the input fields.
     * @param e The event.
     */
    function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setDialog({ ...dialog, [e.target.name]: e.target.value });
    }
    return (
        <Dialog
            onClose={onClose}
            title="Add Peer"
            actions={
                <React.Fragment>
                    <button
                        type="button"
                        className="button button--primary"
                        onClick={handleAddPeer}
                        disabled={dialog.isBusy || !dialog.publicKey || !dialog.netID}
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        className="button button--secondary"
                        disabled={dialog.isBusy}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </React.Fragment>
            }
        >
            <React.Fragment>
                <p>Please enter the details of the peer to add.</p>
                <div className="dialog--label">Public key</div>
                <div className="dialog--value">
                    <input
                        type="text"
                        className="input--stretch"
                        placeholder="e.g. 0x0000000000000000000000000000000000000000000000000000000000000000"
                        name="publicKey"
                        value={dialog.publicKey}
                        disabled={dialog.isBusy}
                        onChange={onChange}
                    />
                </div>
                <div className="dialog--label">Network id</div>
                <div className="dialog--value">
                    <input
                        type="text"
                        className="input--stretch"
                        placeholder="e.g. 127.0.0.1:15600"
                        name="netID"
                        value={dialog.netID}
                        disabled={dialog.isBusy}
                        onChange={onChange}
                    />
                    {error && <p className="dialog--error">{error}</p>}
                </div>
            </React.Fragment>
        </Dialog>
    );
};
export default AddPeerDialog;
