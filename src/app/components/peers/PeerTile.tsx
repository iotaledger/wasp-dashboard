import React, { useState } from "react";
import { Action } from "../../../lib/enums";
import { PeeringNodeStatusResponse } from "../../../services/wasp_client";
import { DeletePeerDialog, Tile } from "../../components";

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

const PeerTile: React.FC<PeerTileProps> = ({ peer, blindMode, detailed }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    /**
     *
     */
    function closeDeletePeerDialog(): void {
        setShowDeleteDialog(false);
    }

    const primaryText = blindMode ? "*".repeat((peer.publicKey ?? "Unknown").length) : peer.publicKey ?? "Unknown";
    const secondaryText = blindMode ? "*".repeat((peer.netID ?? "Unknown").length) : peer.netID ?? "Unknown";
    const healthy = peer.isAlive;

    const actions = [
        {
            text: "Delete",
            handleAction: () => {
                setShowDeleteDialog(true);
            },
            type: Action.Delete,
        },
    ];

    return (
        <React.Fragment>
            <Tile
                displayHealth
                healthy={healthy}
                primaryText={primaryText}
                secondaryText={detailed ? secondaryText : undefined}
                actions={detailed ? actions : undefined}
            />
            {showDeleteDialog && (
                <DeletePeerDialog onClose={closeDeletePeerDialog} onSuccess={closeDeletePeerDialog} peer={peer} />
            )}
        </React.Fragment>
    );
};

PeerTile.defaultProps = {
    detailed: false,
};

export default PeerTile;
