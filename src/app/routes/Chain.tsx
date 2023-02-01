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
    LoadingChainContractsBox,
    LoadingChainInfoBox,
    ChainNavbar,
} from "../components";

interface ConsensusMetric {
    status: string;
    triggerTime: Date;
}

/**
 * Transforms a ChainInfoResponse into an array of key-value pairs, useful if it has nested properties
 *
 * @param chainInfo Input chain info
 * @returns An array of key-value pairs
 */
function transformInfoIntoArray(chainInfo: ChainInfoResponse) {
    return Object.entries(chainInfo).flatMap(([key, val]: [string, string | Record<string, string>]) => {
        if (typeof val === "object") {
            return Object.entries(val);
        }
        return [[key, val]];
    });
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
    const [chainBlobs, setChainBlobs] = useState<Blob[]>([]);
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
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getContracts({ chainID })
            .then(newChainContracts => {
                setChainContracts(newChainContracts);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .accountsGetTotalAssets({ chainID })
            .then(newTotalAssets => {
                setChainAssets(newTotalAssets);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blobsGetAllBlobs({ chainID })
            .then(newBlobs => {
                if (newBlobs.blobs) {
                    setChainBlobs(newBlobs.blobs);
                }
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        chainsService.getLatestBlock(chainID).then(newLatestBlock => {
            if (newLatestBlock) {
                setChainLatestBlock(newLatestBlock);
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .metrics()
            .getChainWorkflowMetrics({ chainID })
            .then(data => {
                const newConsensusMetrics = data as Record<string, string>;
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
                        {chainProperties.length > 0 ? (
                            <InfoBox title="Info" cardClassName="first-card">
                                {chainProperties
                                    .filter(([key]) => !INFO_SKIP_NAMES.has(key))
                                    .map(([key, val]) => (
                                        <KeyValueRow key={key} keyText={INFO_NAMES[key]} value={val.toString()} />
                                    ))}
                            </InfoBox>
                        ) : (
                            <LoadingChainInfoBox />
                        )}
                        {chainContracts ? (
                            <InfoBox title="Contracts">
                                {chainContracts.map(({ name, hName, description, programHash }) => (
                                    <KeyValueRow
                                        key={name}
                                        keyText={{ text: name, url: `/chains/${chainID}/contract/${hName}` }}
                                        value={description}
                                    />
                                ))}
                            </InfoBox>
                        ) : (
                            <LoadingChainContractsBox />
                        )}
                    </div>
                    <InfoBox title="Blobs">
                        {chainBlobs.length > 0 ? (
                            <Table tHead={["Hash", "Size (bytes)"]} tBody={chainBlobs as ITableRow[]} />
                        ) : (
                            <Tile primaryText="No blobs found." />
                        )}
                    </InfoBox>
                    <div className="cols-wrapper">
                        <InfoBox title="Total Assets" cardClassName="first-card">
                            {chainAssets?.baseTokens && (
                                <KeyValueRow
                                    key={chainAssets?.baseTokens}
                                    keyText="Base Tokens"
                                    value={chainAssets?.baseTokens}
                                />
                            )}
                            {chainAssets?.nativeTokens && chainAssets.nativeTokens.length > 0 && (
                                <Table tHead={["ID", "Amount"]} tBody={chainAssets.nativeTokens as ITableRow[]} />
                            )}
                        </InfoBox>
                        <InfoBox title="Latest block">
                            <KeyValueRow
                                keyText="Block index"
                                value={{
                                    text: chainLatestBlock?.blockIndex?.toString(),
                                    url: `${chainURL}/blocks/${chainLatestBlock?.blockIndex}`,
                                }}
                            />
                            <KeyValueRow keyText="Timestamp" value={formatDate(chainLatestBlock?.timestamp)} />
                        </InfoBox>
                    </div>

                    <InfoBox title="EVM">
                        {chainID && (
                            <React.Fragment>
                                <KeyValueRow keyText="EVM ChainID" value={chainInfo?.evmChainId} />
                                <KeyValueRow keyText="JSON-RPC URL" value={formatEVMJSONRPCUrl(chainID)} />
                            </React.Fragment>
                        )}
                    </InfoBox>
                    <InfoBox title="Consensus metrics">
                        <Table
                            tHead={["Flag name", "Status", "Trigger time"]}
                            tBody={chainConsensusMetrics as ITableRow[]}
                        />
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

const INFO_SKIP_NAMES = new Set(["evmChainId"]);

const INFO_NAMES: Record<string, string> = {
    chainID: "Chain ID",
    chainOwnerId: "Owner ID",
    description: "Description",
    gasFeeTokenId: "Gas fee token ID",
    gasPerToken: "Gas per token",
    validatorFeeShare: "Validator fee share",
    isActive: "Active",
    maxBlobSize: "Max blob size",
    maxEventSize: "Max events size",
    maxEventsPerReq: "Max events per req",
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
