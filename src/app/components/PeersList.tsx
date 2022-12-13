import "./PeerList.scss";

import React from "react";
import { PeerActions } from "../../lib/interfaces";
import { PeeringNodeStatusResponse } from "../../services/wasp_client";
import { PeerTile } from "./";

interface PeersListProps {
    /**
     * List of peers to display
     * @type {PeeringNodeStatusResponse[]}
     */
    peers: PeeringNodeStatusResponse[];
    /**
     * Whether to hide the peers details
     */
    blindMode: boolean;
    /**
     * Object with the actions of the buttons in the peer tile.
     */
    peerActions?: PeerActions;
}

const PeersList: React.FC<PeersListProps> = ({ peers, blindMode, peerActions }) => (
    <div className="peer-list">
        {peers.length === 0 ? (
            <p className="margin-t-s">There are no peers.</p>
        ) : (
            peers.map((peer, idx) => <PeerTile key={idx} peer={peer} blindMode={blindMode} actions={peerActions} />)
        )}
    </div>
);
PeersList.defaultProps = {
    peerActions: undefined
};

export default PeersList;
