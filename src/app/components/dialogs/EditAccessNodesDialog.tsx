import React, { useState } from "react";
import { Dialog } from "..";
import { PeeringNodeStatusResponse, ServiceFactory, WaspClientService } from "../../../lib";

interface IEditAccessNodesDialog {
    onClose: () => void;
    onSuccess: () => void;
    accessNodes: PeeringNodeStatusResponse[];
    peerNodes: PeeringNodeStatusResponse[];
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

    /**
     * Add and remove the access nodes.
     * @param newAccessNodes Updated access nodes.
     */
    async function updateAccessNodes(newAccessNodes: PeeringNodeStatusResponse[]) {
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
            newNodes.map(async ({ publicKey }) => {
                if (!publicKey) {
                    return;
                }

                await waspClientService.chains().addAccessNode({ chainID, publicKey });
            }),
        );

        // Remove peer nodes as access nodes
        await Promise.all(
            removedNodes.map(async ({ publicKey }) => {
                if (!publicKey) {
                    return;
                }

                await waspClientService.chains().removeAccessNode({ chainID, publicKey });
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
                console.error(e);
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
                        setCheckedNodes([...checkedNodes]);
                    };
                    return (
                        <div className="access-nodes-item" key={node.publicKey}>
                            <input id={node.publicKey} type="checkbox" checked={isChecked} onChange={onChecked} />
                            <label htmlFor={node.publicKey}>{node.publicKey}</label>
                        </div>
                    );
                })}
            </div>
        </Dialog>
    );
};

export default EditAccessNodesDialog;
