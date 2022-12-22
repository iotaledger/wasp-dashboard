import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./Chain.scss";
import {
    AssetsResponse,
    ChainInfoResponse,
    ContractInfoResponse,
    Blob,
    BlockInfoResponse,
    CommitteeInfoResponse,
} from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";
import { formatEVMJSONRPCUrl } from "../../utils/evm";
import InfoItem from "../components/InfoItem";
import GoBackButton from "../components/layout/GoBackButton";
import InfoBox from "../components/layout/InfoBox";
import Table from "../components/layout/Table";
import Tile from "../components/Tile";

interface ChainInfoValue {
    key: string;
    val: string;
}

interface ConsensusMetric {
    status: string;
    triggerTime: Date;
}

/**
 * Transforms a ChainInfoResponse into an array of key-value pairs
 *
 * @param chainInfo Input chain info
 * @returns An array of key-value pairs
 */
function transformInfoIntoArray(chainInfo: ChainInfoResponse): ChainInfoValue[] {
    return Object.entries(chainInfo).flatMap(([key, val]) => {
        if (typeof val === "object") {
            return Object.entries(val as Record<string, string>).map(([k, v]) => ({ key: k, val: v }));
        }
        return { key, val };
    }) as ChainInfoValue[];
}

const getStatus = (status: boolean) => (status ? "UP" : "DOWN");

/**
 * Chain panel.
 * @returns The node to render.
 */
function Chain() {
    const [chainInfo, setChainInfo] = useState<ChainInfoValue[]>([]);
    const [chainContracts, setChainContracts] = useState<ContractInfoResponse[]>([]);
    const [chainAccounts, setChainAccounts] = useState<string[]>([]);
    const [chainAssets, setChainAssets] = useState<AssetsResponse | null>(null);
    const [chainBlobs, setChainBlobs] = useState<Blob[]>([]);
    const [chainLatestBlock, setChainLatestBlock] = useState<BlockInfoResponse | null>(null);
    const [chainCommitteeInfo, setChainCommitteeInfo] = useState<CommitteeInfoResponse | null>(null);
    const [chainConsensusMetrics, setChainConsensusMetrics] = useState<Record<string, ConsensusMetric> | null>(null);
    const { chainID } = useParams();
    const [newChainConsensusMetrics, setNewChainConsensusMetrics] = useState<unknown[]>([]);
    const EVMChainID = chainInfo.find(({ key }) => key === "eVMChainID");
    const ChainID = chainInfo.find(({ key }) => key === "chainID");

    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getChainInfo({ chainID })
            .then(newChainInfo => {
                setChainInfo(transformInfoIntoArray(newChainInfo));
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
            .chains()
            .getCommitteeInfo({ chainID })
            .then(newCommitteeInfo => {
                setChainCommitteeInfo(newCommitteeInfo);
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
                setChainConsensusMetrics(metrics);
            });
    }, []);
    React.useEffect(() => {
        if (chainConsensusMetrics) {
            const chainConsensusMetricsArray = Object.entries(chainConsensusMetrics).map(([key, value]) => {
                const flagName = METRICS_NAMES[key];
                const status = typeof value.status === "boolean" ? value.status : value.status.toString();
                const triggerTime = value.triggerTime?.toISOString() ?? "NEVER";
                return { flagName, status, triggerTime };
            });
            setNewChainConsensusMetrics(chainConsensusMetricsArray as unknown[]);
            console.log("newChainConsensusMetrics", newChainConsensusMetrics);
        }
    }, [chainConsensusMetrics]);

    return (
        <div className="chain">
            <div className="chain-wrapper">
                <div className="middle row">
                    <GoBackButton goTo="/chains" text="chains" />
                    <h2 className="margin-l-s l1-details-title">Chain {chainID}</h2>
                </div>
                <div className="content">
                    <InfoBox title="Info">
                        {chainInfo
                            .filter(({ key }) => !INFO_SKIP_NAMES.has(key))
                            .map(({ key, val }) => (
                                <InfoItem key={key} keyValue={INFO_NAMES[key]} value={val.toString()} />
                            ))}
                    </InfoBox>
                    <InfoBox title="Contracts">
                        {chainContracts.map(({ name, hName, description, programHash }) => (
                            <InfoItem
                                isKeyALink
                                key={name}
                                keyValue={name}
                                value={description}
                                url={`/chain/${chainID}/contract/${hName}`}
                            />
                        ))}
                    </InfoBox>
                    <InfoBox title="On-chain accounts">
                        {chainAccounts.map(account => (
                            <Tile key={account} id={account} />
                        ))}
                    </InfoBox>
                    <InfoBox title="Total Assets">
                        {chainAssets?.baseTokens && (
                            <InfoItem
                                key={chainAssets?.baseTokens}
                                keyValue="Base Tokens"
                                value={chainAssets?.baseTokens}
                            />
                        )}
                        {chainAssets?.tokens && chainAssets.tokens.length > 0 && (
                            <Table tHead={["ID", "Amount"]} tBody={chainAssets.tokens} />
                        )}
                    </InfoBox>
                    <InfoBox title="Blobs">
                        {chainBlobs.length > 0 ? (
                            <Table tHead={["Hash", "Size (bytes)"]} tBody={chainBlobs} />
                        ) : (
                            <p>No blobs found.</p>
                        )}
                    </InfoBox>
                    <InfoBox title="Latest block">
                        <InfoItem
                            isValueALink
                            keyValue="Block index"
                            value={chainLatestBlock?.blockIndex}
                            url={`blocks/${chainLatestBlock?.blockIndex}`}
                        />
                        <InfoItem keyValue="Last updated" value={chainLatestBlock?.timestamp?.toISOString()} />
                    </InfoBox>
                    <InfoBox title="Committee">
                        {chainCommitteeInfo && (
                            <React.Fragment>
                                <InfoItem keyValue="Address" value={chainCommitteeInfo.stateAddress} />
                                <InfoItem keyValue="Status" value={getStatus(chainCommitteeInfo.active ?? false)} />
                            </React.Fragment>
                        )}
                        <br />
                        <h4>Peers</h4>
                        {chainCommitteeInfo?.committeeNodes && (
                            <Table
                                tHead={["Index", "Pubkey", "Status"]}
                                tBody={chainCommitteeInfo?.committeeNodes.map(({ node }, i) => [
                                    i,
                                    node?.publicKey,
                                    getStatus(node?.isAlive ?? false),
                                ])}
                            />
                        )}
                    </InfoBox>
                    <InfoBox title="EVM">
                        {ChainID && (
                            <React.Fragment>
                                <InfoItem keyValue="EVM ChainID" value={EVMChainID?.val} />
                                <InfoItem keyValue="JSON-RPC URL" value={formatEVMJSONRPCUrl(ChainID?.val)} />
                            </React.Fragment>
                        )}
                    </InfoBox>
                    <InfoBox title="Consensus metrics">
                        {ChainID && (
                            <Table tHead={["Flag name", "Status", "Trigger time"]} tBody={newChainConsensusMetrics} />
                        )}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

const INFO_SKIP_NAMES = new Set(["eVMChainID"]);

const INFO_NAMES: Record<string, string> = {
    chainID: "Chain ID",
    chainOwnerID: "Owner ID",
    description: "Description",
    gasFeeTokenID: "Gas fee token ID",
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
