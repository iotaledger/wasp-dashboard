import React from "react";
import { HealthGood, HealthWarning } from "../../assets";
import { PeeringNodeStatusResponse } from "../../services/wasp_client";
import "./PeerTile.scss";

interface PeerTileProps {
    /**
     * Peer to show.
     * @type {PeeringNodeStatusResponse}
     */
    peer: PeeringNodeStatusResponse;
    /**
     * Is blind mode activated.
     */
    blindMode: boolean;
    /**
     * Show a detailed list with actions.
     * @default false
     */
    detailed?: boolean;
}

const PeerTile: React.FC<PeerTileProps> = ({ peer, blindMode, detailed }) => (
    <div className={`peers-panel--item card ${detailed ? "detailed" : "summary"}`}>
        <span className="peer-health">
            <div className="peer-health-icon">{peer.isAlive ? <HealthGood /> : <HealthWarning />}</div>
        </span>
        <div className="col peer-data">
            <span className="peer-id">
                {blindMode ? "*".repeat((peer.publicKey ?? "Unknown").length) : peer.publicKey ?? "Unknown"}
            </span>
            {detailed && (
                <p className="secondary">
                    {blindMode ? "*".repeat((peer.netID ?? "Unknown").length) : peer.netID ?? "Unknown"}
                </p>
            )}
        </div>
    </div>
);

PeerTile.defaultProps = {
    detailed: false,
};

export default PeerTile;
