import "./Route.scss";
import "./Peers.scss";
import React, { useEffect, useState } from "react";
import { ServiceFactory, EventAggregator, PeersService, PeeringNodeStatusResponse } from "../../lib";
import { PeersList, AddPeerDialog } from "../components";

const Peers: React.FC = () => {
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
     *
     */
    function closeAddPeerDialog() {
        setShowAddPeerDialog(false);
    }
    return (
        <div className="main">
            <div className="main-wrapper">
                <div className="row spread">
                    <h2>Peers</h2>
                    <div className="row">
                        <button type="button" className="add-button" onClick={() => setShowAddPeerDialog(true)}>
                            Add Peer
                        </button>
                    </div>
                </div>
                <div className="content">
                    <div className="peers-panel">
                        <PeersList peers={peersList} detailedList />
                    </div>
                    {showAddPeerDialog && <AddPeerDialog onClose={closeAddPeerDialog} onSuccess={closeAddPeerDialog} />}
                </div>
            </div>
        </div>
    );
};
export default Peers;
