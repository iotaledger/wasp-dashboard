import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceFactory, WaspClientService, BlockInfoResponse, RequestReceiptResponse } from "../../lib/classes";
import "./Block.scss";
import KeyValueRow from "../components/KeyValueRow";
import GoBackButton from "../components/layout/GoBackButton";

/**
 * Block panel.
 * @returns The node to render.
 */
function Block() {
    const [blockInfo, setBlockInfo] = useState<BlockInfoResponse | null>(null);
    const [blockRequests, setBlockRequests] = useState<RequestReceiptResponse[]>([]);
    const { chainID, blockID } = useParams();
    const blockIndex = Number(blockID);

    React.useEffect(() => {
        if (!blockID || !chainID) {
            return;
        }

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blocklogGetBlockInfo({ chainID, blockIndex })
            .then(newBlockInfo => {
                setBlockInfo(newBlockInfo);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blocklogGetRequestReceiptsOfBlock({ chainID, blockIndex })
            .then(async newBlockReceipts => {
                if (newBlockReceipts.receipts) {
                    setBlockRequests(newBlockReceipts.receipts);
                }
            });
    }, []);

    const info = blockInfo?.gasFeeCharged ? Object.entries(blockInfo).filter(([k]) => BLOCK_DATA_VALUES.has(k)) : null;

    return (
        <div className="block">
            <div className="block-wrapper">
                <div className="middle row">
                    <GoBackButton goTo={`/chains/${chainID}`} text="chain" />
                    <h2 className="margin-l-s">Block {blockID}</h2>
                </div>
                <div className="content">
                    <div className="card col fill">
                        <div className="block-summary">
                            <h4>Info</h4>
                            {info?.map(([k, v]) => (
                                <KeyValueRow key={k} keyText={BLOCK_DATA_NAMES[k]} value={JSON.stringify(v)} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="middle row">
                    <h2 className="margin-l-s">Requests</h2>
                </div>
                <div className="content">
                    {blockRequests.map((receipt, index) => {
                        const params = receipt?.request?.params?.Items;
                        const senderAccount = receipt.request?.senderAccount;
                        const attachedBaseTokens = receipt?.request?.fungibleTokens?.baseTokens;
                        const allowanceBaseTokens = receipt?.request?.allowance?.fungibleTokens?.baseTokens;
                        return (
                            <div key={receipt.request?.requestID} className="card col fill">
                                <div className="block-summary">
                                    <h4>REQUEST #{receipt?.requestIndex}</h4>
                                    <div className="block-info-content">
                                        <div key={index} className="block-info-item">
                                            <h4>info</h4>
                                            {Object.entries(receipt)
                                                .filter(([r]) => BLOCK_REQUESTS_INFO_VALUES.has(r))
                                                .map(([k, v]) => (
                                                    <KeyValueRow
                                                        key={k}
                                                        keyText={BLOCK_REQUEST_NAMES[k]}
                                                        value={JSON.stringify(v)}
                                                    />
                                                ))}
                                            <KeyValueRow keyText="Sender" value={senderAccount} />
                                        </div>
                                        <div key={index} className="block-info-item">
                                            <h4>Parameters</h4>
                                            {params?.map(({ Key, Value }: Record<string, string>) => (
                                                <KeyValueRow key={Key} keyText={Key} value={JSON.stringify(Value)} />
                                            ))}
                                        </div>
                                        <div key={index} className="block-info-item">
                                            <h4>Attached tokens</h4>

                                            <KeyValueRow keyText="Base tokens" value={attachedBaseTokens} />
                                        </div>
                                        <div key={index} className="block-info-item">
                                            <h4>Allowance</h4>
                                            <KeyValueRow keyText="Base tokens" value={allowanceBaseTokens} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

const BLOCK_DATA_NAMES: Record<string, string> = {
    blockIndex: "Block Index",
    timestamp: "Timestamp",
    previousL1CommitmentHash: "Previous state commitment",
    anchorTransactionID: "Anchor transaction ID",
    totalBaseTokensInL2Accounts: "Total base tokens in L2 accounts",
    totalStorageDeposit: "Total storage deposit",
    gasBurned: "Gas burned",
    gasFeeCharged: "Gas fee charged",
};

const BLOCK_REQUEST_NAMES: Record<string, string> = {
    blockIndex: "Block Index",
    gasBudget: "Gas budget",
    gasBurned: "Gas burned",
    gasFeeCharged: "Gas fee charged",
    requestIndex: "Request index",
};

const BLOCK_DATA_VALUES = new Set([
    "blockIndex",
    "timestamp",
    "previousL1CommitmentHash",
    "anchorTransactionID",
    "totalBaseTokensInL2Accounts",
    "totalStorageDeposit",
    "gasBurned",
    "gasFeeCharged",
]);

const BLOCK_REQUESTS_INFO_VALUES = new Set(["blockIndex", "gasBudget", "gasBurned", "gasFeeCharged", "requestIndex"]);

export default Block;
