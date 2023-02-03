import React, { useState } from "react";
import { DeleteIcon } from "../../../assets";
import { PeeringNodeStatusResponse, Action } from "../../../lib";
import { DeletePeerDialog, Tile } from "../../components";
import { usePermissions } from "../../hooks";

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

    /**
     * Enable the delete button.
     * @default true
     */
    enableDelete?: boolean;
}

const PeerTile: React.FC<PeerTileProps> = ({ peer, detailed, enableDelete }) => {
    const [hasWritePermission] = usePermissions();
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    /**
     *
     */
    function closeDeletePeerDialog(): void {
        setShowDeleteDialog(false);
    }

    const primaryText = peer.publicKey;
    const secondaryText = `${peer.netId} ${Number.isInteger(peer.numUsers) ? `- Users: ${peer.numUsers}` : ""}`;
    const healthy = peer.isAlive;

    const actions = [
        {
            text: "Delete",
            handleAction: () => {
                setShowDeleteDialog(true);
            },
            type: Action.Delete,
            disabled: !hasWritePermission,
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
                actions={enableDelete ? actions : undefined}
            />
            {showDeleteDialog && (
                <DeletePeerDialog onClose={closeDeletePeerDialog} onSuccess={closeDeletePeerDialog} peer={peer} />
            )}
        </React.Fragment>
    );
};

PeerTile.defaultProps = {
    detailed: false,
    enableDelete: true,
};

export default PeerTile;
