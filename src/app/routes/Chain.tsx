import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    AssetsResponse,
    ChainInfoResponse,
    ContractInfoResponse,
    Blob,
    BlockInfoResponse,
    CommitteeInfoResponse,
    WaspClientService,
    ServiceFactory,
} from "../../lib/classes";
import "./Chain.scss";
import { ITableRow } from "../../lib/interfaces";
import { formatEVMJSONRPCUrl } from "../../lib/utils";
import { KeyValueRow, GoBackButton, InfoBox, Table, Tile } from "../components";

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
    const [chainConsensusMetrics, setChainConsensusMetrics] = useState<
        Record<string, ConsensusMetric> | null | ITableRow[]
    >(null);
    const { chainID } = useParams();
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
                const chainConsensusMetricsArray = Object.entries(metrics).map(([key, value]) => {
                    const flagName = METRICS_NAMES[key];
                    const status = typeof value.status === "boolean" ? value.status : value.status.toString();
                    const triggerTime = value.triggerTime?.toISOString() ?? "NEVER";
                    return { flagName, status, triggerTime };
                });
                setChainConsensusMetrics(chainConsensusMetricsArray);
            });
    }, []);

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
                                <KeyValueRow key={key} keyText={INFO_NAMES[key]} value={val.toString()} />
                            ))}
                    </InfoBox>
                    <InfoBox title="Contracts">
                        {chainContracts.map(({ name, hName, description, programHash }) => (
                            <KeyValueRow
                                key={name}
                                keyText={{ text: name, url: `/chain/${chainID}/contract/${hName}` }}
                                value={description}
                            />
                        ))}
                    </InfoBox>
                    <InfoBox title="On-chain accounts">
                        {chainAccounts.map(account => (
                            <Tile key={account} primaryText={account} />
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
                        {chainAssets?.tokens && chainAssets.tokens.length > 0 && (
                            <Table tHead={["ID", "Amount"]} tBody={chainAssets.tokens as ITableRow[]} />
                        )}
                    </InfoBox>
                    <InfoBox title="Blobs">
                        {chainBlobs.length > 0 ? (
                            <Table tHead={["Hash", "Size (bytes)"]} tBody={chainBlobs as ITableRow[]} />
                        ) : (
                            <p>No blobs found.</p>
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
                        <KeyValueRow keyText="Last updated" value={chainLatestBlock?.timestamp?.toISOString()} />
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
                        {ChainID && (
                            <React.Fragment>
                                <KeyValueRow keyText="EVM ChainID" value={EVMChainID?.val} />
                                <KeyValueRow keyText="JSON-RPC URL" value={formatEVMJSONRPCUrl(ChainID?.val)} />
                            </React.Fragment>
                        )}
                    </InfoBox>
                    <InfoBox title="Consensus metrics">
                        {ChainID && (
                            <Table
                                tHead={["Flag name", "Status", "Trigger time"]}
                                tBody={chainConsensusMetrics as ITableRow[]}
                            />
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
