/* eslint-disable react/no-multi-comp */
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Route.scss";
import { ServiceFactory } from "../../lib";
import { BlockData, ChainsService } from "../../lib/classes/services/chainsService";
import { Breadcrumb, InfoBox, KeyValueRow, Tile } from "../components";
import ChainNavbar from "../components/ChainNavbar";

/**
 * ChainBlockExplorer panel.
 * @returns The node to render.
 */
function ChainBlockExplorer() {
    const chainsService = ServiceFactory.get<ChainsService>(ChainsService.ServiceName);

    const [blockData, setBlockData] = useState<BlockData | null>(null);
    const [latestBlock, setLatestBlock] = useState<number>();
    const { chainID, blockID } = useParams();

    const blockIndex = Number(blockID);
    const chainURL = `/chains/${chainID}`;

    const chainBreadcrumbs = [
        { goTo: "/", text: "Home" },
        { goTo: chainURL, text: `Chain ${chainID}` },
        { goTo: `${chainURL}/blocks/${blockID}`, text: `Block ${blockID}` },
    ];

    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        chainsService
            .getBlock(chainID, blockIndex)
            .then(newBlockData => {
                if (newBlockData) {
                    setBlockData(newBlockData);
                }
            })
            .catch(e => {
                console.error(e);
                setBlockData(null);
            });

        chainsService
            .getLatestBlock(chainID)
            .then(newLatestBlock => {
                if (newLatestBlock) {
                    setLatestBlock(newLatestBlock.blockIndex);
                }
            })
            .catch(() => setLatestBlock(0));
    }, [blockID]);

    const info = blockData?.info ? Object.entries(blockData.info).filter(([k]) => BLOCK_DATA_VALUES.has(k)) : null;
    
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
        <div className="main">
            <div className="main-wrapper">
                <Breadcrumb breadcrumbs={chainBreadcrumbs} />
                <div className="middle row">
                    <h2 className="l1-details-title">Chain {chainID}</h2>
                </div>
                <div className="content">
                    <ChainNavbar chainID={chainID} block={latestBlock} />
                    <div className="middle row">
                        <h2>Block {blockID}</h2>
                    </div>
                    <div className="content">
                        <InfoBox title="Info">
                            {info?.map(([k, v]) => (
                                <KeyValueRow key={k} keyText={BLOCK_DATA_NAMES[k]} value={v} />
                            ))}
                        </InfoBox>
                    </div>
                    <div className="middle row">
                        <h2>Requests</h2>
                    </div>
                    <div className="content">
                        {blockData?.requests.map((receipt, index) => {
                            const params = receipt?.request?.params?.items;
                            return (
                                <InfoBox key={receipt.request?.requestId} title={`REQUEST #${receipt?.requestIndex}`}>
                                    <div className="info-content">
                                        <div className="main-info-item">
                                            <h4>info</h4>
                                            {Object.entries(receipt)
                                                .filter(([r]) => BLOCK_RECEIPTS_INFO_VALUES.has(r))
                                                .map(([k, v]) => (
                                                    <KeyValueRow
                                                        key={k}
                                                        keyText={BLOCK_REQUEST_NAMES[k]}
                                                        value={JSON.stringify(v)}
                                                    />
                                                ))}
                                        </div>
                                        <div className="main-info-item">
                                            <h4>Request</h4>
                                            {Object.entries(receipt.request ?? {})
                                                .filter(([r]) => BLOCK_REQUESTS_INFO_VALUES.has(r))
                                                .map(([key, value]) => (
                                                    <KeyValueRow
                                                        key={key}
                                                        keyText={key}
                                                        value={JSON.stringify(value)}
                                                    />
                                                ))}
                                        </div>
                                        <div className="main-info-item">
                                            <h4>Parameters</h4>
                                            {params?.map(x => (
                                                <KeyValueRow
                                                    key={x.key}
                                                    keyText={x.key}
                                                    value={JSON.stringify(x.value)}
                                                />
                                            ))}
                                        </div>
                                        <div className="main-info-item">
                                            <h4>Contracts</h4>
                                            {Object.entries(receipt.request?.callTarget ?? {}).map(([key, value]) => (
                                                <KeyValueRow key={key} keyText={key} value={JSON.stringify(value)} />
                                            ))}
                                        </div>
                                        <div className="main-info-item">
                                            <h4>Fungible Tokens</h4>
                                            {Object.entries(receipt.request?.allowance?.fungibleTokens ?? {}).map(
                                                ([key, value]) => (
                                                    <KeyValueRow
                                                        key={key}
                                                        keyText={key}
                                                        value={JSON.stringify(value)}
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <div className="main-info-item">
                                            <h4>NFTs</h4>
                                            {Object.entries(receipt.request?.allowance?.nfts ?? {}).map(
                                                ([key, value]) => (
                                                    <KeyValueRow
                                                        key={key}
                                                        keyText={key}
                                                        value={JSON.stringify(value)}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </InfoBox>
                            );
                        })}
                    </div>
                    <div className="middle row">
                        <h2>Events</h2>
                    </div>
                    <div className="content">
                        <InfoBox title="Events">
                            {blockData?.events?.length === 0 ? (
                                <Tile primaryText="No events found." />
                            ) : (
                                blockData?.events?.map(event => <Tile key={event} primaryText={event} />)
                            )}
                        </InfoBox>
                    </div>
                    <div className="card fill">
                        <div className="summary row spread-centered">
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
    transactionSubEssenceHash: "Transaction subessence hash",
    numOffLedgerRequests: "Off ledger requests",
    numSuccessfulRequests: "Sucessful requests",
    totalRequests: "Total requests",
};

const BLOCK_REQUEST_NAMES: Record<string, string> = {
    blockIndex: "Block Index",
    gasBudget: "Gas budget",
    gasBurned: "Gas burned",
    gasFeeCharged: "Gas fee charged",
    requestIndex: "Request index",
    senderAccount: "Sender Account",
    targetAddress: "Target Address",
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
    "transactionSubEssenceHash",
    "numOffLedgerRequests",
    "numSuccessfulRequests",
    "totalRequests",
]);

const BLOCK_RECEIPTS_INFO_VALUES = new Set(["blockIndex", "gasBudget", "gasBurned", "gasFeeCharged", "requestIndex"]);

const BLOCK_REQUESTS_INFO_VALUES = new Set([
    "isOffLedger",
    "senderAccount",
    "targetAddress",
    "gasBudget",
    "requestId",
    "senderAccount",
    "targetAddress",
]);

export default ChainBlockExplorer;
