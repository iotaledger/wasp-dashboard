import "./Peers.scss";

import React, { useEffect, useState } from "react";
import { EyeClosedIcon, EyeIcon } from "../../assets";
import { ServiceFactory } from "../../factories/serviceFactory";
import { PeerActions } from "../../lib/interfaces";
import { EventAggregator } from "../../services/eventAggregator";
import { PeersService } from "../../services/peersService";
import { SettingsService } from "../../services/settingsService";
import { PeeringNodeStatusResponse, PeeringTrustRequest } from "../../services/wasp_client";
import { PeersList, Dialog } from "../components";

enum DialogType {
    Add = "add",
    Delete = "delete",
}

interface IDialogState {
    peerAddress: string;
    peerId: string;
    isBusy?: boolean;
}

type DialogState =
    | (IDialogState & { show: false; type?: DialogType })
    | (IDialogState & { show: true; type: DialogType });

const DIALOG_INITIAL_STATE: DialogState = {
    show: false,
    peerAddress: "",
    peerId: "",
};

const Peers: React.FC = () => {
    /**
     * The settings service.
     * @private
     * @type {SettingsService}
     */
    const settingsService: SettingsService = ServiceFactory.get<SettingsService>(SettingsService.ServiceName);

    /**
     * The peers service.
     * @private
     * @type {PeersService}
     */
    const peersService: PeersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    /**
     * The peers state.
     */
    const [peersList, setPeersList] = useState<PeeringNodeStatusResponse[]>(peersService.get());

    /**
     * The blind mode state.
     */
    const [blindMode, setBlindMode] = useState<boolean>(settingsService.getBlindMode());

    /**
     * The state to handle "Add Peer" dialog.
     */
    const [peerDialog, setPeerDialog] = useState<DialogState>(DIALOG_INITIAL_STATE);

    /**
     * An object with the actions that will have the buttons of the peer list.
     * @type {PeerActions}
     */
    const PEER_ACTIONS: PeerActions = {
        delete: showDeleteConfirmation,
    };

    /**
     * The component mounted.
     * @returns {Promise<void>}
     */
    useEffect(() => {
        EventAggregator.subscribe("peers-state", "peers-quick-list", setPeersList);
    }, []);

    /**
     * Toggle the blind mode.
     */
    function toggleBlindMode() {
        const newBlindMode = !blindMode;
        setBlindMode(newBlindMode);
        settingsService.setBlindMode(newBlindMode);
    }

    /**
     * Reset the dialog state.
     */
    function resetDialogState() {
        setPeerDialog(DIALOG_INITIAL_STATE);
    }

    /**
     * Function to handle "Delete" action in the peer list.
     * @param peer The peer to distrust.
     */
    function showDeleteConfirmation(peer: PeeringNodeStatusResponse) {
        if (peer.publicKey && peer.netID) {
            setPeerDialog({
                show: true,
                type: DialogType.Delete,
                peerAddress: peer.publicKey,
                peerId: peer.netID,
            });
        }
    }

    /**
     * Add new peer.
     */
    async function handleAddPeer() {
        if (!peerDialog.peerAddress || !peerDialog.peerId || peerDialog.isBusy) {
            return;
        }

        const newPeer: PeeringTrustRequest = {
            publicKey: peerDialog.peerAddress,
            netID: peerDialog.peerId,
        };
        setPeerDialog({ ...peerDialog, isBusy: true });
        await peersService.trustPeer(newPeer);
        resetDialogState();
    }

    /**
     * Distrust a peer.
     */
    async function handleDeletePeer() {
        if (!peerDialog.peerAddress || !peerDialog.peerId || peerDialog.isBusy) {
            return;
        }

        const peerToDistrust: PeeringTrustRequest = {
            publicKey: peerDialog.peerAddress,
            netID: peerDialog.peerId,
        };
        setPeerDialog({ ...peerDialog, isBusy: true });
        await peersService.distrustPeer(peerToDistrust);
        resetDialogState();
    }

    /**
     * The dialog's input change event.
     * @param e The event.
     */
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPeerDialog({ ...peerDialog, [e.target.name]: e.target.value });
    }

    /**
     * OnClick handler of the primary button of the dialog.
     */
    async function handlePrimaryDialogAction() {
        if (peerDialog.type === DialogType.Add) {
            await handleAddPeer();
        } else if (peerDialog.type === DialogType.Delete) {
            await handleDeletePeer();
        }
    }

    return (
        <div className="peers">
            <div className="content">
                <div className="row spread">
                    <h2>Peers</h2>
                    <div className="row">
                        <button type="button" onClick={toggleBlindMode} className="peers--icon-button">
                            {blindMode ? <EyeIcon /> : <EyeClosedIcon />}
                        </button>

                        <button
                            type="button"
                            className="add-button"
                            onClick={() => setPeerDialog({ ...peerDialog, show: true, type: DialogType.Add })}
                        >
                            Add Peer
                        </button>
                    </div>
                </div>
                <div className="peers-panel">
                    {peersList.length === 0 ? (
                        <p className="margin-t-s">There are no peers.</p>
                    ) : (
                        <PeersList peers={peersList} blindMode={blindMode} peerActions={PEER_ACTIONS} />
                    )}
                </div>
                {peerDialog.show && (
                    <Dialog
                        onClose={() => setPeerDialog({ ...peerDialog, show: false })}
                        title={peerDialog.type === DialogType.Add ? "Add Peer" : "Delete Confirmation"}
                        actions={
                            <React.Fragment>
                                <button
                                    type="button"
                                    className="button button--primary"
                                    onClick={handlePrimaryDialogAction}
                                    disabled={peerDialog.isBusy}
                                >
                                    {peerDialog.type === DialogType.Add ? "Add" : "Yes"}
                                </button>
                                <button type="button" className="button button--secondary" onClick={resetDialogState}>
                                    {peerDialog.type === DialogType.Add ? "Cancel" : "No"}
                                </button>
                            </React.Fragment>
                        }
                    >
                        {peerDialog.type === DialogType.Add ? (
                            <React.Fragment>
                                <p>Please enter the details of the peer to add.</p>
                                <div className="dialog--label">Address</div>
                                <div className="dialog--value">
                                    <input
                                        type="text"
                                        className="input--stretch"
                                        placeholder="e.g. /ip4/127.0.0.1/tcp/15600"
                                        name="peerAddress"
                                        value={peerDialog.peerAddress}
                                        disabled={peerDialog.isBusy}
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
                                        value={peerDialog.peerId}
                                        disabled={peerDialog.isBusy}
                                        onChange={onChange}
                                    />
                                </div>
                            </React.Fragment>
                        ) : (
                            <p className="margin-t-t">Are you sure you want to delete the peer? </p>
                        )}
                    </Dialog>
                )}
            </div>
        </div>
    );
};
export default Peers;
