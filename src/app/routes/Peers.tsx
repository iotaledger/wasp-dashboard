import "./Peers.scss";

import React, { useEffect, useState } from "react";
import { EyeClosedIcon, EyeIcon } from "../../assets";
import {
    ServiceFactory,
    EventAggregator,
    PeersService,
    SettingsService,
    PeeringNodeStatusResponse,
} from "../../lib/classes";
import { PeersList, AddPeerDialog } from "../components";

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
     *
     */
    function closeAddPeerDialog() {
        setShowAddPeerDialog(false);
    }
    return (
        <div className="peers">
            <div className="content">
                <div className="row spread">
                    <h2>Peers</h2>
                    <div className="row">
                        <button type="button" onClick={toggleBlindMode} className="peers-blind-icon-button">
                            {blindMode ? <EyeIcon /> : <EyeClosedIcon />}
                        </button>

                        <button type="button" className="add-button" onClick={() => setShowAddPeerDialog(true)}>
                            Add Peer
                        </button>
                    </div>
                </div>
                <div className="peers-panel">
                    <PeersList peers={peersList} blindMode={blindMode} detailedList />
                </div>
                {showAddPeerDialog && <AddPeerDialog onClose={closeAddPeerDialog} onSuccess={closeAddPeerDialog} />}
            </div>
        </div>
    );
};
export default Peers;
