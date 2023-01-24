import "./PeerList.scss";
import React from "react";
import { PeeringNodeStatusResponse } from "../../../lib";
import { PeerTile } from "./";

interface PeersListProps {
    /**
     * List of peers to display
     * @type {PeeringNodeStatusResponse[]}
     */
    peers: PeeringNodeStatusResponse[];

    /**
     * Whether to show the detailed list of peers
     * @default false
     */
    detailedList?: boolean;
}

const PeersList: React.FC<PeersListProps> = ({ peers, detailedList }) => (
    <div className="peer-list">
        {peers.length === 0 ? (
            <p className="margin-t-s">There are no peers.</p>
        ) : (
            peers.map((peer, idx) => <PeerTile key={idx} peer={peer} detailed={detailedList} />)
        )}
    </div>
);

PeersList.defaultProps = {
    detailedList: false,
};

export default PeersList;
