import React, { useState } from "react";
import { Dialog } from "../";
import { ServiceFactory } from "../../../factories/serviceFactory";
import { IDialogState } from "../../../lib/interfaces";
import { PeersService } from "../../../services/peersService";
import { PeeringTrustRequest } from "../../../services/wasp_client";

interface AddPeerDialogProps {
    onClose: () => void;
}

const DIALOG_INITIAL_STATE: IDialogState = {
    peerAddress: "",
    peerId: ""
};

const AddPeerDialog: React.FC<AddPeerDialogProps> = ({ onClose }) => {
    const [dialog, setDialog] = useState<IDialogState>(DIALOG_INITIAL_STATE);

    /**
     * The peers service.
     */
    const peersService: PeersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    /**
     * Handle add a ner peer.
     */
    async function handleAddPeer(): Promise<void> {
        if (!dialog.peerAddress || !dialog.peerId || dialog.isBusy) {
            return;
        }

        const newPeer: PeeringTrustRequest = {
            publicKey: dialog.peerAddress,
            netID: dialog.peerId
        };
        setDialog({ ...dialog, isBusy: true });
        await peersService.trustPeer(newPeer);
        setDialog(DIALOG_INITIAL_STATE);
        onClose();
    }

    /**
     * Handle the change of the input fields.
     * @param e The event.
     */
    function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setDialog({ ...dialog, [e.target.name]: e.target.value });
    }

    /**
     * Handle the close of the dialog.
     */
    function handleOnClose(): void {
        setDialog(DIALOG_INITIAL_STATE);
        onClose();
    }

    return (
        <Dialog
            onClose={handleOnClose}
            title="Add Peer"
            actions={
                <React.Fragment>
                    <button
                        type="button"
                        className="button button--primary"
                        onClick={handleAddPeer}
                        disabled={dialog.isBusy}
                    >
                        Add
                    </button>
                    <button type="button" className="button button--secondary" onClick={handleOnClose}>
                        Cancel
                    </button>
                </React.Fragment>
            }
        >
            <React.Fragment>
                <p>Please enter the details of the peer to add.</p>
                <div className="dialog--label">Address</div>
                <div className="dialog--value">
                    <input
                        type="text"
                        className="input--stretch"
                        placeholder="e.g. /ip4/127.0.0.1/tcp/15600"
                        name="peerAddress"
                        value={dialog.peerAddress}
                        disabled={dialog.isBusy}
                        onChange={onChange}
                    />
                </div>
                <div className="dialog--label">Id</div>
                <div className="dialog--value">
                    <input
                        type="text"
                        className="input--stretch"
                        placeholder="e.g. 12D3KooWC7uE9w3RN4Vh1FJAZa8SbE8yMWR6wCVBajcWpyWguV73"
                        name="peerId"
                        value={dialog.peerId}
                        disabled={dialog.isBusy}
                        onChange={onChange}
                    />
                </div>
            </React.Fragment>
        </Dialog>
    );
};
export default AddPeerDialog;
