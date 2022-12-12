import React from "react";
import { TrustedIcon, NotTrustedIcon } from "../../assets";
import { PeerActions } from "../../lib/interfaces";
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
     * An object with the functions that will have the buttons of the peer.
     * If not provided, the peer will be shown as a summary.
     * @type {PeerActions}
     */
    actions?: PeerActions;
}

const PeerTile: React.FC<PeerTileProps> = ({ peer, blindMode, actions }) => (
    <div className={`peers-${actions ? "panel" : "summary"}--item`}>
        {actions ? (
            <div className="card col padding-m">
                <div className="row middle">
                    <span className="peer-health">
                        <div className="peer-health-icon">{peer.isAlive ? <TrustedIcon /> : <NotTrustedIcon />}</div>
                    </span>
                    <div className="peer-data">
                        <span>
                            {blindMode ? "*".repeat((peer.publicKey ?? "Unknown").length) : peer.publicKey ?? "Unknown"}
                        </span>
                        <span className="margin-t-t">
                            {blindMode ? "*".repeat((peer.netID ?? "Unknown").length) : peer.netID ?? "Unknown"}
                        </span>
                        <span className="margin-t-t">Relation: {peer.isTrusted ? "Known" : "Unknown"}</span>
                    </div>
                    <div className="peer-actions col">
                        {peer.isTrusted && (
                            <button
                                className="card--action card--action-danger"
                                type="button"
                                onClick={() => actions.delete(peer)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>
        ) : (
            <React.Fragment>
                <div className="peer-health-icon">{peer.isAlive ? <TrustedIcon /> : <NotTrustedIcon />}</div>
                <div className="col">
                    {peer.publicKey && (
                        <div className="peer-id">{blindMode ? "*".repeat(peer.publicKey.length) : peer.publicKey}</div>
                    )}
                </div>
            </React.Fragment>
        )}
    </div>
);

PeerTile.defaultProps = {
    actions: undefined,
};

export default PeerTile;
