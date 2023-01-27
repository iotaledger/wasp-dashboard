/* eslint-disable react/no-multi-comp */
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Route.scss";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets";
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

    const navigate = useNavigate();
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
                    <ChainNavbar chainID={chainID} block={blockIndex} />
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
                            const senderAccount = receipt.request?.senderAccount;
                            const attachedBaseTokens = receipt?.request?.fungibleTokens?.baseTokens;
                            const allowanceBaseTokens = receipt?.request?.allowance?.fungibleTokens?.baseTokens;
                            return (
                                <InfoBox key={receipt.request?.requestId} title={`REQUEST #${receipt?.requestIndex}`}>
                                    <div className="info-content">
                                        <div className="main-info-item">
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
                                            <h4>Attached tokens</h4>

                                            <KeyValueRow keyText="Base tokens" value={attachedBaseTokens} />
                                        </div>
                                        <div className="main-info-item">
                                            <h4>Allowance</h4>
                                            <KeyValueRow keyText="Base tokens" value={allowanceBaseTokens} />
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
                        <div className="summary row spread-centered middle">
                            <BlockLink
                                chainID={chainID}
                                disabled={blockIndex === 0}
                                blockIndex={0}
                                label="First"
                                icon={<ChevronLeftIcon />}
                                codeRepetition={2}
                                iconFirst
                            />
                            <BlockLink
                                chainID={chainID}
                                disabled={previousBlock < 0}
                                blockIndex={previousBlock}
                                label="Previous"
                                icon={<ChevronLeftIcon />}
                                iconFirst
                            />
                            <div className="select-wrapper row middle range-wrapper">
                                <select
                                    value={blockIndex}
                                    onChange={e => navigate(`/chains/${chainID}/blocks/${e.target.value}`)}
                                    className=""
                                >
                                    {latestBlock &&
                                        createBlocksRange(latestBlock).map((_, block) => (
                                            <option key={block} value={block} className="padding-t">
                                                {block}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <BlockLink
                                chainID={chainID}
                                disabled={!nextBlock}
                                blockIndex={nextBlock}
                                label="Next"
                                icon={<ChevronRightIcon />}
                            />
                            <BlockLink
                                chainID={chainID}
                                disabled={latestBlock === blockIndex}
                                blockIndex={latestBlock}
                                label="Latest"
                                icon={<ChevronRightIcon />}
                                codeRepetition={2}
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
    codeRepetition: 1,
    icon: undefined,
    iconFirst: false,
};

const createBlocksRange = (lastIndex: number) =>
    // eslint-disable-next-line unicorn/no-new-array
    new Array(lastIndex + 1).fill(0) as number[];

/**
 * A Link to navigate between blocks.
 * @param param0 BlockLink options
 * @param param0.label Label.
 * @param param0.chainID ChainID.
 * @param param0.blockIndex The destination block index.
 * @param param0.disabled Disabled or not.
 * @param param0.icon Link's icon.
 * @param param0.doubledIcon Double the icon or not.
 * @param param0.iconFirst Show the icon before the text.
 * @param param0.codeRepetition How many times to repeat the code.
 * @returns The Node to render.
 */
function BlockLink({
    label,
    chainID,
    blockIndex,
    disabled,
    icon,
    iconFirst,
    codeRepetition = 1,
}: {
    label: string;
    chainID?: string;
    blockIndex?: number;
    disabled: boolean;
    icon?: React.ReactNode;
    iconFirst?: boolean;
    codeRepetition?: number;
}) {
    return (
        <Link to={`/chains/${chainID}/blocks/${blockIndex}`} className={`nav-link ${disabled && "disabled"}`}>
            <div className={`${iconFirst ? "row" : "row-reverse"} middle`}>
                <div className={`${iconFirst ? "margin-r-t" : "margin-l-t"} row`}>
                    {Array.from({ length: codeRepetition }, (_, i) => icon)}
                </div>
                <span>{label}</span>
            </div>
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

export default ChainBlockExplorer;
