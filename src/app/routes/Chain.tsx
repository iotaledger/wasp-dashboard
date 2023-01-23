import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { EditIcon } from "../../assets";
import "./Route.scss";
import "./Chain.scss";
import {
    AssetsResponse,
    ChainInfoResponse,
    ContractInfoResponse,
    Blob,
    BlockInfoResponse,
    CommitteeInfoResponse,
    WaspClientService,
    ServiceFactory,
    PeersService,
    PeeringNodeStatusResponse,
    EventAggregator,
} from "../../lib";
import { ITableRow } from "../../lib/interfaces";
import { formatDate, formatEVMJSONRPCUrl } from "../../lib/utils";
import { Breadcrumb, InfoBox, KeyValueRow, Table, Tile } from "../components";
import EditAccessNodesDialog from "../components/dialogs/EditAccessNodesDialog";

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

const getStatus = (status: boolean) => (status ? "UP" : "DOWN");

/**
 * Chain panel.
 * @returns The node to render.
 */
function Chain() {
    const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
    const peersService: PeersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    const [chainInfo, setChainInfo] = useState<ChainInfoResponse | null>(null);
    const [chainContracts, setChainContracts] = useState<ContractInfoResponse[]>([]);
    const [chainAccounts, setChainAccounts] = useState<string[]>([]);
    const [chainAssets, setChainAssets] = useState<AssetsResponse | null>(null);
    const [chainBlobs, setChainBlobs] = useState<Blob[]>([]);
    const [chainLatestBlock, setChainLatestBlock] = useState<BlockInfoResponse | null>(null);
    const [chainCommitteeInfo, setChainCommitteeInfo] = useState<CommitteeInfoResponse | null>(null);
    const [chainConsensusMetrics, setChainConsensusMetrics] = useState<
        Record<string, ConsensusMetric> | null | ITableRow[]
    >(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { chainID } = useParams();
    const [peersList, setPeersList] = useState<PeeringNodeStatusResponse[]>(peersService.get());

    const chainProperties = chainInfo ? transformInfoIntoArray(chainInfo) : [];
    const accessNodes = chainCommitteeInfo?.accessNodes?.map(({ node }) => node as PeeringNodeStatusResponse) ?? [];

    const chainBreadcrumbs = [
        { goTo: "/chains", text: "Chains" },
        { goTo: `/chains/${chainID}`, text: `Chain ${chainID}` },
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
            .accountsGetAccounts({ chainID })
            .then(newAccounts => {
                if (newAccounts.accounts) {
                    setChainAccounts(newAccounts.accounts);
                }
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
        waspClientService
            .corecontracts()
            .blocklogGetLatestBlockInfo({ chainID })
            .then(newLatestBlock => {
                setChainLatestBlock(newLatestBlock);
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

        loadCommitteeInfo();

        EventAggregator.subscribe("peers-state", "chain", setPeersList);
    }, []);

    /**
     *
     */
    function loadCommitteeInfo() {
        if (!chainID) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getCommitteeInfo({ chainID })
            .then(newCommitteeInfo => {
                setChainCommitteeInfo(newCommitteeInfo);
            });
    }

    /**
     * Add and remove the access nodes.
     * @param newAccessNodes Updated access nodes.
     */
    async function updateAccessNodes(newAccessNodes: PeeringNodeStatusResponse[]) {
        if (!chainID) {
            return;
        }

        // Filter what new access nodes were not previously enabled
        const newNodes = newAccessNodes.filter(
            peer => !accessNodes.some(node => node.publicKey === peer.publicKey),
        );
        // Filter what trusted nodes are not access nodes
        const removedNodes = peersList.filter(
            peer => !newAccessNodes.some(node => node.publicKey === peer.publicKey),
        );

        // Add peer nodes as access nodes
        await Promise.all(
            newNodes.map(async ({ publicKey }) => {
                if (!publicKey) {
                    return;
                }
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                waspClientService
                    .chains()
                    .addAccessNode({ chainID, publicKey })
                    .catch(() => {});
            }),
        );

        // Remove peer nodes as access nodes
        await Promise.all(
            removedNodes.map(async ({ publicKey }) => {
                if (!publicKey) {
                    return;
                }

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                waspClientService
                    .chains()
                    .removeAccessNode({ chainID, publicKey })
                    .catch(() => {});
            }),
        );
    }

    /**
     * When the access nodes are edited.
     * @param newAccessNodes Updated access nodes.
     */
    function onAccessNodesEdited(newAccessNodes: PeeringNodeStatusResponse[]) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        updateAccessNodes(newAccessNodes).then(() => {
            loadCommitteeInfo();
        });
    }

    return (
        <div className="main">
            <div className="main-wrapper">
                <Breadcrumb breadcrumbs={chainBreadcrumbs} />
                <div className="middle row">
                    <h2 className="l1-details-title">Chain {chainID}</h2>
                </div>
                <div className="content">
                    <InfoBox title="Info">
                        {chainProperties
                            .filter(([key]) => !INFO_SKIP_NAMES.has(key))
                            .map(([key, val]) => (
                                <KeyValueRow key={key} keyText={INFO_NAMES[key]} value={val.toString()} />
                            ))}
                    </InfoBox>
                    <InfoBox
                        title="Access nodes"
                        titleWithIcon={true}
                        icon={
                            <button type="button" onClick={() => setIsPopupOpen(true)} className="edit-button">
                                <EditIcon />
                            </button>
                        }
                    >
                        {isPopupOpen && (
                            <EditAccessNodesDialog
                                peerNodes={peersList}
                                accessNodes={accessNodes}
                                onSuccess={onAccessNodesEdited}
                                onClose={() => setIsPopupOpen(false)}
                            />
                        )}
                        {accessNodes.length > 0 ? (
                            accessNodes?.map(node => (
                                <Tile
                                    key={node.publicKey}
                                    primaryText={node.publicKey}
                                    healthy={node.isAlive}
                                    displayHealth={true}
                                />
                            ))
                        ) : (
                            <Tile primaryText="No access nodes found." />
                        )}
                    </InfoBox>
                    <InfoBox title="Contracts">
                        {chainContracts.map(({ name, hName, description, programHash }) => (
                            <KeyValueRow
                                key={name}
                                keyText={{ text: name, url: `/chains/${chainID}/contract/${hName}` }}
                                value={description}
                            />
                        ))}
                    </InfoBox>
                    <InfoBox title="On-chain accounts">
                        {chainAccounts.map(account => (
                            <Tile key={account} primaryText={account} url={`/chains/${chainID}/accounts/${account}`} />
                        ))}
                    </InfoBox>
                    <InfoBox title="Total Assets">
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
                    <InfoBox title="Blobs">
                        {chainBlobs.length > 0 ? (
                            <Table tHead={["Hash", "Size (bytes)"]} tBody={chainBlobs as ITableRow[]} />
                        ) : (
                            <Tile primaryText="No blobs found." />
                        )}
                    </InfoBox>
                    <InfoBox title="Latest block">
                        <KeyValueRow
                            keyText="Block index"
                            value={{
                                text: chainLatestBlock?.blockIndex?.toString(),
                                url: `blocks/${chainLatestBlock?.blockIndex}`,
                            }}
                        />
                        <KeyValueRow keyText="Last updated" value={chainLatestBlock?.timestamp} />
                    </InfoBox>
                    <InfoBox title="Committee">
                        {chainCommitteeInfo && (
                            <React.Fragment>
                                <KeyValueRow keyText="Address" value={chainCommitteeInfo.stateAddress} />
                                <KeyValueRow keyText="Status" value={getStatus(chainCommitteeInfo.active ?? false)} />
                            </React.Fragment>
                        )}
                        <br />
                        <h4>Peers</h4>
                        {chainCommitteeInfo?.committeeNodes && (
                            <Table
                                tHead={["Index", "Pubkey", "Status"]}
                                tBody={
                                    chainCommitteeInfo?.committeeNodes.map(({ node }, i) => [
                                        i,
                                        node?.publicKey,
                                        getStatus(node?.isAlive ?? false),
                                    ]) as unknown as ITableRow[]
                                }
                            />
                        )}
                    </InfoBox>
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
