import "./PeerList.scss";
import React from "react";
import { PeeringNode } from "../../../lib/classes/services/peersService";
import { PeerTile } from "./";

interface PeersListProps {
    /**
     * List of peers to display
     * @type {PeeringNode[]}
     */
    peers: PeeringNode[];

    /**
     * Whether to show the detailed list of peers
     * @default false
     */
    detailedList?: boolean;

    /**
     * Enable the delete button.
     * @default true
     */
    enableDelete?: boolean;

    /**
     * Custom text when there are no peers.
     * @default No peers found.
     */
    emptyText?: string;
}

const PeersList: React.FC<PeersListProps> = ({ peers, detailedList, enableDelete, emptyText }) => (
    <div className="peer-list">
        {peers?.length === 0 ? (
            <p>{emptyText}</p>
        ) : (
            peers.map((peer, idx) => (
                <PeerTile key={idx} peer={peer} detailed={detailedList} enableDelete={enableDelete} />
            ))
        )}
    </div>
);

PeersList.defaultProps = {
    detailedList: false,
    emptyText: "No peers found.",
    enableDelete: true,
};

export default PeersList;
