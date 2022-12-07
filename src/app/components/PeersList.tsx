import React from "react";
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
    detailedList?: boolean;
}

const PeersList: React.FC<PeersListProps> = ({ peers, blindMode, detailedList }) => (
    <React.Fragment>
        {peers.map((peer, idx) => (
            <PeerTile key={idx} peer={peer} blindMode={blindMode} detailed={detailedList} />
        ))}
    </React.Fragment>
);

PeersList.defaultProps = {
    detailedList: false,
};

export default PeersList;
