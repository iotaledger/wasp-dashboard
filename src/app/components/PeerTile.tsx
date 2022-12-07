import React from "react";
import { TrustedIcon, NotTrustedIcon } from "../../assets";
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
    <div className={`peers-${detailed ? "panel" : "summary"}--item`}>
        {detailed ? (
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
    detailed: false,
};

export default PeerTile;
