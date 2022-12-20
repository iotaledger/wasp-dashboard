import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import GoBackButton from "../components/layout/GoBackButton";
import InfoBox from "../components/layout/InfoBox";

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
                                <div key={key} className="card-item">
                                    <span>{INFO_NAMES[key]}:</span>
                                    <p className="value">{val.toString()}</p>
                                </div>
                            ))}
                    </InfoBox>
                    <InfoBox title="Contracts">
                        {chainContracts.map(({ name, hName, description, programHash }) => (
                            <div key={name} className="card-item">
                                <Link to={`/chain/${chainID}/contract/${hName}`}>
                                    <span>{name}:</span>
                                </Link>
                                <p className="value">{description}</p>
                            </div>
                        ))}
                    </InfoBox>
                    <InfoBox title="On-chain accounts">
                        <ul>
                            {chainAccounts.map(account => (
                                <li key={account}>{account}</li>
                            ))}
                        </ul>
                    </InfoBox>
                    <InfoBox title="Total Assets">
                        {chainAssets?.baseTokens && (
                            <React.Fragment>
                                <div className="card-item">
                                    <span>Base Tokens:</span>
                                    <p className="value">{chainAssets?.baseTokens}</p>
                                </div>
                                <br />
                            </React.Fragment>
                        )}
                        {chainAssets?.tokens && chainAssets.tokens.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chainAssets?.tokens?.map(token => (
                                        <tr key={token.iD}>
                                            <td>{token.iD}</td>
                                            <td>{token.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </InfoBox>
                    <InfoBox title="Blobs">
                        {chainBlobs.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Hash</th>
                                        <th>Size (bytes)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chainBlobs.map(blob => (
                                        <tr key={blob.hash}>
                                            <td>{blob.hash}</td>
                                            <td>{blob.size}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No blobs found.</p>
                        )}
                    </InfoBox>
                    <InfoBox title="Latest block">
                        <div className="card-item">
                            <span>Block index:</span>
                            <Link to={`blocks/${chainLatestBlock?.blockIndex}`}>
                                <p className="value">{chainLatestBlock?.blockIndex}</p>
                            </Link>
                        </div>
                        <div className="card-item">
                            <span>Last updated:</span>
                            <p className="value">{chainLatestBlock?.timestamp?.toISOString()}</p>
                        </div>
                    </InfoBox>
                    <InfoBox title="Committee">
                        {chainCommitteeInfo && (
                            <React.Fragment>
                                <div className="card-item">
                                    <span>Address:</span>
                                    <p className="value">{chainCommitteeInfo.stateAddress}</p>
                                </div>
                                <div className="card-item">
                                    <span>Status:</span>
                                    <p className="value">{getStatus(chainCommitteeInfo.active ?? false)}</p>
                                </div>
                            </React.Fragment>
                        )}
                        <br />
                        <h4>Peers</h4>
                        {chainCommitteeInfo?.candidateNodes && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Index</th>
                                        <th>Pubkey</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chainCommitteeInfo.committeeNodes?.map(({ node }, i) => (
                                        <tr key={node?.publicKey}>
                                            <td>{i}</td>
                                            <td>{node?.publicKey}</td>
                                            <td>{getStatus(node?.isAlive ?? false)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </InfoBox>
                    <InfoBox title="EVM">
                        {ChainID && (
                            <React.Fragment>
                                <div className="card-item">
                                    <span>EVM ChainID:</span>
                                    <p className="value">{EVMChainID?.val}</p>
                                </div>
                                <div className="card-item">
                                    <span>JSON-RPC URL:</span>
                                    <p className="value">{formatEVMJSONRPCUrl(ChainID?.val)}</p>
                                </div>
                            </React.Fragment>
                        )}
                    </InfoBox>
                    <InfoBox title="Consensus metrics">
                        {ChainID && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Flag name</th>
                                        <th>Status</th>
                                        <th>Trigger time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chainConsensusMetrics &&
                                        Object.entries(chainConsensusMetrics).map(([key, val]) => (
                                            <tr key={key}>
                                                <td>{METRICS_NAMES[key]}</td>
                                                <td>
                                                    {typeof val.status === "boolean" ? (
                                                        <input type="checkbox" checked={val.status} readOnly />
                                                    ) : (
                                                        val.status.toString()
                                                    )}
                                                </td>
                                                <td>{val.triggerTime?.toISOString() ?? "NEVER"}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
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
