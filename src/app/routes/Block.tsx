import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./Block.scss";
import { BlockInfoResponse, RequestReceiptResponse } from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";
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
            .then((newBlockInfo) => {
                setBlockInfo(newBlockInfo);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blocklogGetRequestReceiptsOfBlock({ chainID, blockIndex })
            .then(async (newBlockReceipts) => {
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
                    <h2 className="margin-l-s l1-details-title">Block {blockID}</h2>
                </div>
                <div className="content">
                    <div className="card col fill">
                        <div className="block-summary">
                            <h4>Info</h4>
                            {info?.map(([k, v]) => (
                                <div key={k} className="card-item">
                                    <span>{BLOCK_DATA_NAMES[k]}:</span>
                                    <p className="value">{JSON.stringify(v)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="middle row">
                    <h2 className="margin-l-s l1-details-title">Requests</h2>
                </div>
                <div className="content">
                    {blockRequests.map((receipt) => {
                        const params = receipt?.request?.params?.Items;
                        const senderAccount = receipt.request?.senderAccount;
                        const attachedBaseTokens = receipt?.request?.fungibleTokens?.baseTokens;
                        const allowanceBaseTokens = receipt?.request?.allowance?.fungibleTokens?.baseTokens;
                        return (
                            <div key={receipt.request?.requestID} className="card col fill">
                                <div className="block-summary">
                                    <h4 className="1-details-title">REQUEST INFO</h4>
                                    {Object.entries(receipt)
                                        .filter(([r]) => BLOCK_REQUESTS_INFO_VALUES.has(r))
                                        .map(([k, v]) => (
                                            <div key={k} className="card-item">
                                                <span>{BLOCK_REQUEST_NAMES[k]}:</span>
                                                <p className="value">{JSON.stringify(v)}</p>
                                            </div>
                                        ))}
                                    <div className="card-item">
                                        <span>Sender:</span>
                                        <p className="value">{senderAccount}</p>
                                    </div>
                                    <br />
                                    <h4 className="1-details-title">Parameters</h4>
                                    {params?.map(({ Key, Value }: Record<string, string>) => (
                                        <div key={Key} className="card-item">
                                            <span>{Key}:</span>
                                            <p className="value">{JSON.stringify(Value)}</p>
                                        </div>
                                    ))}
                                    <br />
                                    <h4 className="1-details-title">Attached tokens</h4>
                                    <div className="card-item">
                                        <span>Base tokens:</span>
                                        <p className="value">{attachedBaseTokens}</p>
                                    </div>
                                    <br />
                                    <h4 className="1-details-title">Allowance</h4>
                                    <div className="card-item">
                                        <span>Base tokens:</span>
                                        <p className="value">{allowanceBaseTokens}</p>
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
