import React, { useState } from "react";
import { Dialog, Tile } from "..";
import { ServiceFactory, WaspClientService } from "../../../lib";
import { PeeringNode } from "../../../lib/classes/services/peersService";

interface IEditAccessNodesDialog {
    onClose: () => void;
    onSuccess: () => void;
    accessNodes: PeeringNode[];
    peerNodes: PeeringNode[];
    chainID: string;
}

const EditAccessNodesDialog: React.FC<IEditAccessNodesDialog> = ({
    onClose,
    onSuccess,
    accessNodes,
    peerNodes,
    chainID,
}) => {
    const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

    const [checkedNodes, setCheckedNodes] = useState([...accessNodes]);
    const [error, setError] = useState<string | null>(null);

    /**
     * Add and remove the access nodes.
     * @param newAccessNodes Updated access nodes.
     */
    async function updateAccessNodes(newAccessNodes: PeeringNode[]) {
        if (!chainID || !accessNodes) {
            return;
        }

        // Filter what new access nodes were not previously enabled
        const newNodes = newAccessNodes.filter(
            peer => !accessNodes.some(node => node.publicKey === peer.publicKey),
        );
        // Filter what trusted nodes are not access nodes
        const removedNodes = peerNodes.filter(
            peer => !newAccessNodes.some(node => node.publicKey === peer.publicKey),
        );

        // Add peer nodes as access nodes
        await Promise.all(
            newNodes.map(async ({ name }) => {
                if (!name) {
                    return;
                }

                await waspClientService.chains().addAccessNode(chainID, name);
            }),
        );

        // Remove peer nodes as access nodes
        await Promise.all(
            removedNodes.map(async ({ name }) => {
                if (!name) {
                    return;
                }

                await waspClientService.chains().removeAccessNode(chainID, name);
            }),
        );
    }

    /**
     * When the access nodes are edited.
     */
    function save() {
        updateAccessNodes(checkedNodes)
            .then(() => {
                onSuccess();
            })
            .catch(e => {
                setError(e.toString() as string);
            });
    }

    // Check if there has been any change at all
    const anyChanges = !(
        accessNodes.length === checkedNodes.length &&
        accessNodes.every((node, i) => node.publicKey === checkedNodes[i].publicKey)
    );
    return (
        <Dialog
            title="Edit access nodes"
            classnames="big"
            onClose={onClose}
            actions={
                <React.Fragment>
                    {error && <p className="dialog-content-error as-action">{error}</p>}
                    <button type="button" className="button button--primary" onClick={save} disabled={!anyChanges}>
                        Save
                    </button>
                    <button type="button" className="button button--primary" onClick={onClose}>
                        Cancel
                    </button>
                </React.Fragment>
            }
        >
            <div className="access-nodes-list">
                {peerNodes.map(node => {
                    const nodeIndex = checkedNodes.findIndex(n => n.publicKey === node.publicKey);
                    const isChecked = nodeIndex >= 0;
                    const onChecked = () => {
                        if (isChecked) {
                            // Remove node
                            checkedNodes.splice(nodeIndex, 1);
                        } else {
                            // Insert node in the original position
                            checkedNodes.splice(nodeIndex, 0, node);
                        }
                        setError(null);
                        setCheckedNodes([...checkedNodes]);
                    };
                    return (
                        <div className="access-nodes-item" key={node.publicKey}>
                            <input id={node.publicKey} type="checkbox" checked={isChecked} onChange={onChecked} />
                            <div
                                className={`${isChecked ? "checked" : ""} access-nodes-item-box`}
                                onClick={onChecked}
                                onKeyDown={onChecked}
                                role="button"
                                tabIndex={0}
                            >
                                <Tile
                                    displayHealth={node.isTrusted}
                                    primaryText={node.publicKey}
                                    secondaryText={`(${node.name}) ${node.peeringURL}`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Dialog>
    );
};

export default EditAccessNodesDialog;
