import "./PeerTile.scss";

import React from "react";
import { HealthGood, HealthWarning } from "../../assets";
import { PeerActions } from "../../lib/interfaces";
import { PeeringNodeStatusResponse } from "../../services/wasp_client";

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
     * An object with the functions that will have the buttons of the peer.
     * If not provided, the peer will be shown as a summary.
     * @type {PeerActions}
     */
    actions?: PeerActions;
}

const PeerTile: React.FC<PeerTileProps> = ({ peer, blindMode, actions }) => (
    <div className={`peers-panel--item card ${actions ? "detailed" : "summary"}`}>
        <span className="peer-health">
            <div className="peer-health-icon">{peer.isAlive ? <HealthGood /> : <HealthWarning />}</div>
        </span>
        <div className="col peer-data">
            <span className="peer-id">
                {blindMode ? "*".repeat((peer.publicKey ?? "Unknown").length) : peer.publicKey ?? "Unknown"}
            </span>
            {actions && (
                <p className="secondary">
                    {blindMode ? "*".repeat((peer.netID ?? "Unknown").length) : peer.netID ?? "Unknown"}
                </p>
            )}
        </div>
        {actions && (
            <div className="col peer-actions">
                <button
                    className="card--action card--action-danger"
                    type="button"
                    onClick={() => {
                        actions.delete(peer);
                    }}
                >
                    Delete
                </button>
            </div>
        )}
    </div>
);

PeerTile.defaultProps = {
    actions: undefined
};

export default PeerTile;
