import React, { useState } from "react";
import { Dialog } from "..";
import { PeeringNodeStatusResponse } from "../../../lib";

interface IEditAccessNodesDialog {
    onClose: () => void;
    onSuccess: (accessNodes: PeeringNodeStatusResponse[]) => void;
    accessNodes: PeeringNodeStatusResponse[];
    peerNodes: PeeringNodeStatusResponse[];
}

const EditAccessNodesDialog: React.FC<IEditAccessNodesDialog> = ({ onClose, onSuccess, accessNodes, peerNodes }) => {
    const [checkedNodes, setCheckedNodes] = useState([...accessNodes]);

    /**
     * Save the new access nodes
     */
    function save() {
        onSuccess(checkedNodes);
        onClose();
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
