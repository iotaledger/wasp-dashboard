/* eslint-disable react/no-multi-comp */
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ServiceFactory,
    WaspClientService,
    BlockInfoResponse,
    RequestReceiptResponse,
    EventsResponse,
} from "../../lib";
import "./Block.scss";
import { KeyValueRow, Breadcrumb, Tile } from "../components";

/**
 * Block panel.
 * @returns The node to render.
 */
function Block() {
    const [blockInfo, setBlockInfo] = useState<BlockInfoResponse | null>(null);
    const [blockRequests, setBlockRequests] = useState<RequestReceiptResponse[]>([]);
    const [latestBlock, setLatestBlock] = useState<number>();
    const [blockEvents, setBlockEvents] = useState<EventsResponse | null>(null);
    const { chainID, blockID } = useParams();
    const blockIndex = Number(blockID);
    const blockBreadcrumbs = [
        { goTo: "/chains", text: "Chains" },
        { goTo: `/chains/${chainID}`, text: `Chain ${chainID}` },
        { goTo: `/chains/${chainID}/blocks/${blockID}`, text: `Block ${blockID}` },
    ];
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
            })
            .catch(() => {
                setBlockInfo(null);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blocklogGetRequestReceiptsOfBlock({ chainID, blockIndex })
            .then(async newBlockReceipts => {
                if (newBlockReceipts.receipts) {
                    setBlockRequests(newBlockReceipts.receipts);
                }
            })
            .catch(() => {
                setBlockRequests([]);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blocklogGetLatestBlockInfo({ chainID })
            .then(newLatestBlock => {
                if (newLatestBlock.blockIndex) {
                    setLatestBlock(newLatestBlock.blockIndex);
                }
            })
            .catch(() => {
                setLatestBlock(0);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blocklogGetEventsOfBlock({ chainID, blockIndex })
            .then(events => {
                setBlockEvents(events);
            });
    }, [blockID]);

    const info = blockInfo ? Object.entries(blockInfo).filter(([k]) => BLOCK_DATA_VALUES.has(k)) : null;

    const previousBlock = blockIndex - 1;

    const nextBlock = (() => {
        if (!latestBlock) {
            return;
        }

        if (blockIndex < latestBlock) {
            return blockIndex + 1;
        }
    })();

    return (
        <div className="block">
            <div className="block-wrapper">
                <Breadcrumb breadcrumbs={blockBreadcrumbs} />
                <div className="middle row">
                    <h2>Block {blockID}</h2>
                </div>
                <div className="content">
                    <div className="card col fill">
                        <div className="block-summary">
                            <h4>Info</h4>
                            {info?.map(([k, v]) => (
                                <KeyValueRow key={k} keyText={BLOCK_DATA_NAMES[k]} value={v} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="middle row">
                    <h2>Requests</h2>
                </div>
                <div className="content">
                    {blockRequests.map((receipt, index) => {
                        const params = receipt?.request?.params?.items;
                        const senderAccount = receipt.request?.senderAccount;
                        const attachedBaseTokens = receipt?.request?.fungibleTokens?.baseTokens;
                        const allowanceBaseTokens = receipt?.request?.allowance?.fungibleTokens?.baseTokens;
                        return (
                            <div key={receipt.request?.requestId} className="card col fill">
                                <div className="block-summary">
                                    <h4>REQUEST #{receipt?.requestIndex}</h4>
                                    <div className="block-info-content">
                                        <div className="block-info-item">
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
                                        <div className="block-info-item">
                                            <h4>Parameters</h4>
                                            {params?.map(x => (
                                                <KeyValueRow
                                                    key={x.key}
                                                    keyText={x.key}
                                                    value={JSON.stringify(x.value)}
                                                />
                                            ))}
                                        </div>
                                        <div className="block-info-item">
                                            <h4>Attached tokens</h4>

                                            <KeyValueRow keyText="Base tokens" value={attachedBaseTokens} />
                                        </div>
                                        <div className="block-info-item">
                                            <h4>Allowance</h4>
                                            <KeyValueRow keyText="Base tokens" value={allowanceBaseTokens} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="middle row">
                    <h2>Events</h2>
                </div>
                <div className="content">
                    <div className="card fill">
                        <div className="block-summary">
                            {blockEvents?.events?.length === 0 ? (
                                <Tile primaryText="No events found." />
                            ) : (
                                blockEvents?.events?.map(event => <Tile key={event} primaryText={event} />)
                            )}
                        </div>
                    </div>
                </div>
                <div className="card fill">
                    <div className="block-summary row spread-centered">
                        <BlockLink chainID={chainID} disabled={blockIndex === 0} blockIndex={0} label="⏮️ First" />
                        <BlockLink
                            chainID={chainID}
                            disabled={previousBlock < 0}
                            blockIndex={previousBlock}
                            label="⬅️ Previous"
                        />
                        <BlockLink chainID={chainID} disabled={!nextBlock} blockIndex={nextBlock} label="Next ➡️" />
                        <BlockLink
                            chainID={chainID}
                            disabled={latestBlock === blockIndex}
                            blockIndex={latestBlock}
                            label="Latest ⏭️"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

BlockLink.defaultProps = {
    blockIndex: 1,
    chainID: "",
};

/**
 * A Link to navigate between blocks.
 * @param param0 BlockLink options
 * @param param0.label Label.
 * @param param0.chainID ChainID.
 * @param param0.blockIndex The destination block index.
 * @param param0.disabled Disabled or not.
 * @returns The Node to render.
 */
function BlockLink({
    label,
    chainID,
    blockIndex,
    disabled,
}: {
    label: string;
    chainID?: string;
    blockIndex?: number;
    disabled: boolean;
}) {
    return (
        <Link to={`/chains/${chainID}/blocks/${blockIndex}`} className={`nav-link ${disabled && "disabled"}`}>
            {label}
        </Link>
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
