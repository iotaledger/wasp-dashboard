import "./Peers.scss";

import React, { useEffect, useState } from "react";
import { EyeClosedIcon, EyeIcon } from "../../assets";
import { ServiceFactory } from "../../factories/serviceFactory";
import { EventAggregator } from "../../services/eventAggregator";
import { PeersService } from "../../services/peersService";
import { SettingsService } from "../../services/settingsService";
import { PeeringNodeStatusResponse } from "../../services/wasp_client";
import { PeersList } from "../components";

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
    return (
        <div className="peers">
            <div className="content">
                <div className="row spread">
                    <h2>Peers</h2>
                    <div className="row">
                        <button type="button" onClick={toggleBlindMode} className="peers--icon-button">
                            {blindMode ? <EyeIcon /> : <EyeClosedIcon />}
                        </button>

                        <button type="button" className="add-button" onClick={() => {}}>
                            Add Peer
                        </button>
                    </div>
                </div>
                <div className="peers-panel">
                    {peersList.length === 0 ? (
                        <p className="margin-t-s">There are no peers.</p>
                    ) : (
                        <PeersList peers={peersList} blindMode={blindMode} detailedList />
                    )}
                </div>
            </div>
        </div>
    );
};
export default Peers;
