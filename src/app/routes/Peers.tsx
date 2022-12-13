import "./Peers.scss";

import React, { useEffect, useState } from "react";
import { EyeClosedIcon, EyeIcon } from "../../assets";
import { ServiceFactory } from "../../factories/serviceFactory";
import { PeerActions } from "../../lib/interfaces";
import { EventAggregator } from "../../services/eventAggregator";
import { PeersService } from "../../services/peersService";
import { SettingsService } from "../../services/settingsService";
import { PeeringNodeStatusResponse } from "../../services/wasp_client";
import { PeersList, AddPeerDialog, DeletePeerDialog } from "../components";

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
    const [showAddPeerDialog, setShowAddPeerDialog] = useState<boolean>(false);

    /**
     * The state to handle "Delete Peer" dialog.
     */
    const [showDeletePeerDialog, setShowDeletePeerDialog] = useState<boolean>(false);

    /**
     * The state to handle the peer to delete.
     */
    const [peerToDelete, setPeerToDelete] = useState<PeeringNodeStatusResponse | null>();

    /**
     * An object with the actions that will have the buttons of the peer list.
     * @type {PeerActions}
     */
    const PEER_ACTIONS: PeerActions = {
        delete: showDeleteConfirmation
    };

    /**
     * The component mounted.
     */
    useEffect(() => {
        EventAggregator.subscribe("peers-state", "peers-quick-list", setPeersList);
    }, []);

    /**
     * Toggle the blind mode.
     */
    function toggleBlindMode(): void {
        const newBlindMode = !blindMode;
        setBlindMode(newBlindMode);
        settingsService.setBlindMode(newBlindMode);
    }

    /**
     * Function to handle "Delete" action in the peer list.
     * @param peer The peer to distrust.
     */
    function showDeleteConfirmation(peer: PeeringNodeStatusResponse): void {
        setPeerToDelete(peer);
        setShowDeletePeerDialog(true);
    }

    /**
     * Close the "Delete Peer" dialog and reset the state.
     */
    function handleCloseDeletePeerDialog(): void {
        setPeerToDelete(null);
        setShowDeletePeerDialog(false);
    }

    /**
     * Distrust a peer.
     */
    async function distrustPeer(): Promise<void> {
        if (!peerToDelete) {
            return;
        }

        const peerToDistrust = {
            publicKey: peerToDelete.publicKey,
            netID: peerToDelete.netID
        };
        await peersService.distrustPeer(peerToDistrust);
        handleCloseDeletePeerDialog();
    }


    return (
        <div className="peers">
            <div className="content">
                <div className="row spread">
                    <h2>Peers</h2>
                    <div className="row">
                        <button type="button" onClick={toggleBlindMode} className="peers--blind-icon-button">
                            {blindMode ? <EyeIcon /> : <EyeClosedIcon />}
                        </button>

                        <button type="button" className="add-button" onClick={() => setShowAddPeerDialog(true)}>
                            Add Peer
                        </button>
                    </div>
                </div>
                <div className="peers-panel">
                    <PeersList peers={peersList} blindMode={blindMode} peerActions={PEER_ACTIONS} />
                </div>
                {showAddPeerDialog && <AddPeerDialog onClose={() => setShowAddPeerDialog(false)} />}
                {showDeletePeerDialog && (
                    <DeletePeerDialog
                        onClose={handleCloseDeletePeerDialog}
                        deletePeer={distrustPeer}
                    />
                )}
            </div>
        </div>
    );
};
export default Peers;
