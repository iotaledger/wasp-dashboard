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
     * Whether to show the detailed list of peers
     * @default false
     */
    peerActions?: PeerActions;
}

const PeersList: React.FC<PeersListProps> = ({ peers, blindMode, peerActions }) => (
    <React.Fragment>
        {peers.map((peer, idx) => (
            <PeerTile key={idx} peer={peer} blindMode={blindMode} actions={peerActions} />
        ))}
    </React.Fragment>
);
PeersList.defaultProps = {
    peerActions: undefined,
};

export default PeersList;
