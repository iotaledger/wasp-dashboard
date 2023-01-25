import React, { useState } from "react";
import { DeleteIcon } from "../../../assets";
import { PeeringNodeStatusResponse, Action } from "../../../lib";
import { DeletePeerDialog, Tile } from "../../components";

interface PeerTileProps {
    /**
     * Peer to show.
     * @type {PeeringNodeStatusResponse}
     */
    peer: PeeringNodeStatusResponse;

    /**
     * Show a detailed list with actions.
     * @default false
     */
    detailed?: boolean;
}

const PeerTile: React.FC<PeerTileProps> = ({ peer, detailed }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    /**
     *
     */
    function closeDeletePeerDialog(): void {
        setShowDeleteDialog(false);
    }

    const primaryText = peer.publicKey;
    const secondaryText = peer.netId;
    const healthy = peer.isAlive;

    const actions = [
        {
            text: "Delete",
            handleAction: () => {
                setShowDeleteDialog(true);
            },
            type: Action.Delete,
            icon: <DeleteIcon />,
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
