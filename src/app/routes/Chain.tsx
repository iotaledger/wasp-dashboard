import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Route.scss";
import "./Chain.scss";
import {
    AssetsResponse,
    ChainInfoResponse,
    ContractInfoResponse,
    Blob,
    WaspClientService,
    ServiceFactory,
    BlockInfoResponse,
    Ratio32,
} from "../../lib";
import { ChainsService } from "../../lib/classes/services/chainsService";
import { ITableRow } from "../../lib/interfaces";
import { formatDate, formatEVMJSONRPCUrl } from "../../lib/utils";
import {
    Breadcrumb,
    InfoBox,
    KeyValueRow,
    Table,
    Tile,
    ChainNavbar,
    LoadingTable,
    LoadingInfo,
    OrderedTable,
} from "../components";

interface ConsensusMetric {
    status: string;
    triggerTime: Date;
}

type StringFormatter = (value: never) => string;

const INFO_STRING_FORMATTERS: Record<string, StringFormatter> = {
    gasPerToken: (value: Ratio32) => `${value.a}:${value.b}`,
    evmGasRatio: (value: Ratio32) => `${value.a}:${value.b}`,
};

/**
 * applies custom formatting for certain info values.
 * @param key the objects key
 * @param value the objects value
 * @returns Either string or any other value
 */
function formatInfoValue(key: string, value: never): unknown {
    if (!value) {
        return "-";
    }

    if (INFO_STRING_FORMATTERS[key] !== undefined) {
        return INFO_STRING_FORMATTERS[key](value);
    }

    return value;
}

/**
 * Transforms a ChainInfoResponse into an array of key-value pairs, useful if it has nested properties
 *
 * @param chainInfo Input chain info
 * @returns An array of key-value pairs
 */
function transformInfoIntoArray(chainInfo: ChainInfoResponse): [string, unknown][] {
    const entries = Object.entries(chainInfo);
    const flatMap = entries.flatMap(([k, v]) => {
        if (typeof v === "object") {
            const nestedEntries = Object.entries(v as never);
            return nestedEntries.map(([nestedKey, nestedValue]) => [
                nestedKey,
                formatInfoValue(nestedKey, nestedValue as never),
            ]);
        }

        return [[k, formatInfoValue(k, v as never)]];
    });

    return flatMap as [string, unknown][];
}

/**
 * Chain panel.
 * @returns The node to render.
 */
function Chain() {
    const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
    const chainsService = ServiceFactory.get<ChainsService>(ChainsService.ServiceName);

    const [chainInfo, setChainInfo] = useState<ChainInfoResponse | null>(null);
    const [chainContracts, setChainContracts] = useState<ContractInfoResponse[] | null>(null);
    const [chainAssets, setChainAssets] = useState<AssetsResponse | null>(null);
    const [chainBlobs, setChainBlobs] = useState<Blob[] | null>(null);
    const [chainLatestBlock, setChainLatestBlock] = useState<BlockInfoResponse | null>(null);
    const [chainConsensusMetrics, setChainConsensusMetrics] = useState<
        Record<string, ConsensusMetric> | null | ITableRow[]
    >(null);
    const { chainID } = useParams();

    const chainURL = `/chains/${chainID}`;
    const chainProperties = chainInfo ? transformInfoIntoArray(chainInfo) : [];

    const chainBreadcrumbs = [
        { goTo: "/", text: "Home" },
        { goTo: chainURL, text: `Chain ${chainID}` },
    ];

    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getChainInfo({ chainID })
            .then(newChainInfo => {
                setChainInfo(newChainInfo);
            })
            .catch(() => {
                setChainInfo(null);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getContracts({ chainID })
            .then(newChainContracts => {
                setChainContracts(newChainContracts);
            })
            .catch(() => {
                setChainContracts(null);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .accountsGetTotalAssets({ chainID })
            .then(newTotalAssets => {
                setChainAssets(newTotalAssets);
            })
            .catch(() => {
                setChainAssets(null);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blobsGetAllBlobs({ chainID })
            .then(newBlobs => {
                if (newBlobs.blobs) {
                    setChainBlobs(newBlobs.blobs);
                }
            })
            .catch(() => {
                setChainBlobs(null);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        chainsService
            .getLatestBlock(chainID)
            .then(newLatestBlock => {
                if (newLatestBlock) {
                    setChainLatestBlock(newLatestBlock);
                }
            })
            .catch(() => {
                setChainLatestBlock(null);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .metrics()
            .getChainWorkflowMetrics({ chainID })
            .then(data => {
                const newConsensusMetrics = data as unknown as Record<string, string>;
                const metrics: Record<string, ConsensusMetric> = {};
                const keys = Object.keys(newConsensusMetrics).filter(k => !k.startsWith("time"));
                for (const key of keys) {
                    const flagName = key.replace("flag", "");
                    metrics[flagName] = {
                        status: newConsensusMetrics[key],
                        triggerTime: newConsensusMetrics[`time${flagName}`] as unknown as Date,
                    };
                }
                const chainConsensusMetricsArray = Object.entries(metrics).map(([key, value]) => {
                    const flagName = METRICS_NAMES[key];
                    const status = typeof value.status === "boolean" ? value.status : value.status.toString();
                    const triggerTime = formatDate(value.triggerTime);
                    return { flagName, status, triggerTime };
                });
                setChainConsensusMetrics(chainConsensusMetricsArray);
            })
            .catch(() => {
                setChainConsensusMetrics(null);
            });
    }, [chainID]);

    return (
        <div className="main">
            <div className="main-wrapper">
                <Breadcrumb breadcrumbs={chainBreadcrumbs} />
                <div className="middle row">
                    <h2 className="l1-details-title">Chain {chainID}</h2>
                </div>
                <div className="content">
                    <ChainNavbar chainID={chainID} block={chainLatestBlock?.blockIndex} />
                    <div className="cols-wrapper">
                        <InfoBox title="Info" cardClassName="first-card">
                            {chainInfo === null ? (
                                <LoadingInfo extraLarge />
                            ) : (chainProperties?.length > 0 ? (
                                <React.Fragment>
                                    {chainProperties
                                        .filter(([key]) => !INFO_SKIP_NAMES.has(key))
                                        .map(([key, val]) => (
                                            <KeyValueRow key={key} keyText={INFO_NAMES[key]} value={val as never} />
                                        ))}
                                </React.Fragment>
                            ) : (
                                <Tile primaryText="No info available for this chain." />
                            ))}
                        </InfoBox>
                        <InfoBox title="Contracts">
                            {chainContracts === null ? (
                                <LoadingInfo large />
                            ) : (chainContracts?.length > 0 ? (
                                <React.Fragment>
                                    {chainContracts.map(({ name, hName, description, programHash }) => (
                                        <KeyValueRow
                                            key={name}
                                            keyText={{ text: name, url: `/chains/${chainID}/contract/${hName}` }}
                                            value={description}
                                        />
                                    ))}
                                </React.Fragment>
                            ) : (
                                <Tile primaryText="No contracts found." />
                            ))}
                        </InfoBox>
                    </div>
                    <InfoBox title="Blobs">
                        {chainBlobs === null ? (
                            <LoadingInfo />
                        ) : (chainBlobs?.length > 0 ? (
                            <OrderedTable
                                tHead={[
                                    { key: "hash", title: "Hash" },
                                    { key: "size", title: "Size (bytes)" },
                                ]}
                                tBody={chainBlobs as unknown as ITableRow[]}
                            />
                        ) : (
                            <Tile primaryText="No blobs found." />
                        ))}
                    </InfoBox>

                    <div className="cols-wrapper">
                        <InfoBox title="Total Assets" cardClassName="first-card">
                            {chainAssets === null ? (
                                <LoadingInfo />
                            ) : (chainAssets?.baseTokens ? (
                                <KeyValueRow
                                    key={chainAssets?.baseTokens}
                                    keyText="Base Tokens"
                                    value={chainAssets?.baseTokens}
                                />
                            ) : (
                                <InfoBox title="Base Tokens">
                                    <Tile primaryText="No base tokens found." />
                                </InfoBox>
                            ))}
                            {chainAssets?.nativeTokens && chainAssets?.nativeTokens?.length > 0 && (
                                <OrderedTable
                                    tHead={[
                                        { key: "id", title: "ID" },
                                        { key: "amount", title: "Amount" },
                                    ]}
                                    tBody={chainAssets.nativeTokens.map(x => x) as unknown as ITableRow[]}
                                />
                            )}
                        </InfoBox>
                        <InfoBox title="Latest block">
                            {chainLatestBlock === null ? (
                                <LoadingInfo />
                            ) : (chainLatestBlock ? (
                                <React.Fragment>
                                    <KeyValueRow
                                        keyText="Block index"
                                        value={{
                                            text: chainLatestBlock?.blockIndex?.toString(),
                                            url: `${chainURL}/blocks/${chainLatestBlock?.blockIndex}`,
                                        }}
                                    />
                                    <KeyValueRow keyText="Timestamp" value={formatDate(chainLatestBlock?.timestamp)} />
                                </React.Fragment>
                            ) : (
                                <Tile primaryText="No latest block found." />
                            ))}
                        </InfoBox>
                    </div>

                    <InfoBox title="EVM">
                        {chainInfo === null ? (
                            <LoadingInfo />
                        ) : (chainID ? (
                            <React.Fragment>
                                <KeyValueRow keyText="EVM ChainID" value={chainInfo?.evmChainId} />
                                <KeyValueRow keyText="JSON-RPC URL" value={formatEVMJSONRPCUrl(chainID)} />
                            </React.Fragment>
                        ) : (
                            <Tile primaryText="No EVM info found." />
                        ))}
                    </InfoBox>
                    <InfoBox title="Consensus metrics">
                        {chainConsensusMetrics === null ? (
                            <LoadingTable large />
                        ) : (chainConsensusMetrics?.length > 0 ? (
                            <Table
                                tHead={["Flag name", "Status", "Trigger time"]}
                                tBody={chainConsensusMetrics as ITableRow[]}
                            />
                        ) : (
                            <Tile primaryText="No metrics found." />
                        ))}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

const INFO_SKIP_NAMES = new Set<string>(["evmChainId"]);

const INFO_NAMES: Record<string, string> = {
    chainID: "Chain ID",
    chainOwnerId: "Owner ID",
    description: "Description",
    evmChainId: "EVM Chain ID",
    gasFeeTokenId: "Gas fee token ID",
    gasPerToken: "WASM gas ratio",
    evmGasRatio: "EVM gas ratio",
    validatorFeeShare: "Validator fee share",
    isActive: "Active",
    maxBlobSize: "Max blob size",
    maxEventSize: "Max events size",
    maxEventsPerReq: "Max events per req",
    maxGasExternalViewCall: "Max Gas (External view call)",
    maxGasPerBlock: "Max Gas (Block)",
    maxGasPerRequest: "Max Gas (Request)",
    minGasPerRequest: "Min Gas (Request)",
    customMetadata: "Custom metadata",
};

const METRICS_NAMES: Record<string, string> = {
    currentStateIndex: "Current State Index",
    BatchProposalSent: "Batch Proposal Sent",
    ConsensusBatchKnown: "Consensus Batch Known",
    InProgress: "In Progress",
    StateReceived: "State Received",
    TransactionFinalized: "Transaction Finalized",
    TransactionPosted: "Transaction Posted",
    TransactionSeen: "Transaction Seen",
    VMResultSigned: "VM Result Signed",
    VMStarted: "VM Started",
};

export default Chain;
