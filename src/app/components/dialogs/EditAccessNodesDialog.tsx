import React, { useState } from "react";
import { Dialog } from "..";
import { PeeringNodeStatusResponse } from "../../../lib/classes";

interface IEditAccessNodesDialog {
    onClose: () => void;
    onSuccess: (accessNodes: PeeringNodeStatusResponse[]) => void;
    accessNodes: PeeringNodeStatusResponse[];
    peerNodes: PeeringNodeStatusResponse[];
}

const EditAccessNodesDialog: React.FC<IEditAccessNodesDialog> = ({
    onClose,
    onSuccess,
    accessNodes,
    peerNodes: peersNodes,
}) => {
    const [checkedNodes, setCheckedNodes] = useState([...accessNodes]);

    /**
     *
     */
    function save() {
        onSuccess(checkedNodes);
        onClose();
    }

    return (
        <Dialog
            title="Edit access nodes"
            dialogClassName="big"
            onClose={onClose}
            actions={
                <button type="button" className="button button--primary" onClick={save}>
                    Save
                </button>
            }
        >
            <div className="access-nodes-list">
                {peersNodes.map(node => {
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
                        <div key={node.publicKey}>
                            <input type="checkbox" checked={isChecked} onChange={onChecked} />
                            <label>{node.publicKey}</label>
                        </div>
                    );
                })}
            </div>
        </Dialog>
    );
};

export default EditAccessNodesDialog;
