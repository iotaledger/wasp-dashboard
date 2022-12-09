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

interface DialogState {
    show: boolean;
    peerAddress: string;
    peerId: string;
    isBusy?: boolean;
}

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
    const settingsService: SettingsService = ServiceFactory.get<SettingsService>("settings");

    /**
     * The peers service.
     * @private
     * @type {PeersService}
     */
    const peersService: PeersService = ServiceFactory.get<PeersService>("peers-service");

    /**
     * The peers state.
     */
    const [peersList, setPeersList] = useState<PeeringNodeStatusResponse[]>(peersService.get());

    /**
     * The blind mode state.
     */
    const [blindMode, setBlindMode] = useState<boolean>(settingsService.getBlindMode());

    /**
     * The dialog state.
     */
    const [addPeerDialog, setAddPeerDialog] = useState<DialogState>(DIALOG_INITIAL_STATE);

    /**
     * The component mounted.
     * @returns {Promise<void>}
     */
    useEffect(() => {
        EventAggregator.subscribe("peers-state", "peers-quick-list", setPeersList);
    }, []);

    /**
     * An object with the actions that will have the buttons of the peer list.
     * @type {PeerActions}
     */
    const PEER_ACTIONS: PeerActions = {
        delete: deletePeer,
    };

    /**
     * Toggle the blind mode.
     */
    function toggleBlindMode() {
        const newBlindMode = !blindMode;
        setBlindMode(newBlindMode);
        settingsService.setBlindMode(newBlindMode);
    }

    /**
     * Add new peer.
     */
    async function handleAddPeer() {
        if (addPeerDialog.isBusy) {
            return;
        }
        if (!addPeerDialog.peerAddress || !addPeerDialog.peerId) {
            return;
        }

        const newPeer: PeeringTrustRequest = {
            publicKey: addPeerDialog.peerAddress,
            netID: addPeerDialog.peerId,
        };
        setAddPeerDialog({ show: true, peerAddress: "", peerId: "", isBusy: true });
        await peersService.trustPeer(newPeer);
        setAddPeerDialog(DIALOG_INITIAL_STATE);
    }

    /**
     * Delete action in the peer list.
     * Peer is not deleted, but marked as distrusted which disconnects it from the network.
     * @param peer The peer to distrust.
     */
    async function deletePeer(peer: PeeringNodeStatusResponse) {
        await peersService.distrustPeer(peer);
    }

    /**
     * The dialog's input change event.
     * @param e The event.
     */
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAddPeerDialog({ ...addPeerDialog, [e.target.name]: e.target.value });
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
                            onClick={() => setAddPeerDialog({ ...addPeerDialog, show: true })}
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
                {addPeerDialog.show && (
                    <Dialog
                        onClose={() => setAddPeerDialog({ ...addPeerDialog, show: false })}
                        title="Add Peer"
                        actions={
                            <React.Fragment>
                                <button
                                    type="button"
                                    className="button button--primary"
                                    onClick={handleAddPeer}
                                    disabled={addPeerDialog.isBusy}
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className="button button--secondary"
                                    onClick={() => setAddPeerDialog({ ...addPeerDialog, show: false })}
                                >
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
                                    value={addPeerDialog.peerAddress}
                                    disabled={addPeerDialog.isBusy}
                                    onChange={(e) =>
                                        setAddPeerDialog({ ...addPeerDialog, peerAddress: e.target.value })
                                    }
                                />
                            </div>
                            <div className="dialog--label">Id</div>
                            <div className="dialog--value">
                                <input
                                    type="text"
                                    className="input--stretch"
                                    placeholder="e.g. 12D3KooWC7uE9w3RN4Vh1FJAZa8SbE8yMWR6wCVBajcWpyWguV73"
                                    name="peerId"
                                    value={addPeerDialog.peerId}
                                    disabled={addPeerDialog.isBusy}
                                    onChange={onChange}
                                />
                            </div>
                        </React.Fragment>
                    </Dialog>
                )}
            </div>
        </div>
    );
};
export default Peers;
