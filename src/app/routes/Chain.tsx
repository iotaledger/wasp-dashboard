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
} from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";
import { formatEVMJSONRPCUrl } from "../../utils/evm";

interface ChainInfoValue {
    key: string;
    val: string;
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
            .then((newChainInfo) => {
                setChainInfo(transformInfoIntoArray(newChainInfo));
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getContracts({ chainID })
            .then((newChainContracts) => {
                setChainContracts(newChainContracts);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .accountsGetAccounts({ chainID })
            .then((newAccounts) => {
                if (newAccounts.accounts) {
                    setChainAccounts(newAccounts.accounts);
                }
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .accountsGetTotalAssets({ chainID })
            .then((newTotalAssets) => {
                setChainAssets(newTotalAssets);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blobsGetAllBlobs({ chainID })
            .then((newBlobs) => {
                if (newBlobs.blobs) {
                    setChainBlobs(newBlobs.blobs);
                }
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blocklogGetLatestBlockInfo({ chainID })
            .then((newLatestBlock) => {
                setChainLatestBlock(newLatestBlock);
            });
    }, []);

    return (
        <div className="chain">
            <div className="chain-wrapper">
                <h2>Chain {chainID}</h2>
                <div className="content">
                    <div className="card col fill">
                        <div className="chain-summary">
                            <h4>Info</h4>
                            {chainInfo
                                .filter(({ key }) => !INFO_SKIP_NAMES.has(key))
                                .map(({ key, val }) => (
                                    <div key={key} className="card-item">
                                        <span>{INFO_NAMES[key]}:</span>
                                        <p className="value">{val.toString()}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="card col fill">
                        <div className="chain-summary">
                            <h4>Contracts</h4>
                            {chainContracts.map(({ name, hName, description, programHash }) => (
                                <div key={name} className="card-item">
                                    <Link to={`/chain/${chainID}/contract/${hName}`}>
                                        <span>{name}:</span>
                                    </Link>
                                    <p className="value">{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card col fill">
                        <div className="chain-summary">
                            <h4>On-chain accounts</h4>
                            <ul>
                                {chainAccounts.map((account) => (
                                    <li key={account}>{account}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="card col fill">
                        <div className="chain-summary">
                            <h4>Total Assets</h4>
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
                                        {chainAssets?.tokens?.map((token) => (
                                            <tr key={token.iD}>
                                                <td>{token.iD}</td>
                                                <td>{token.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    <div className="card col fill">
                        <div className="chain-summary">
                            <h4>Blobs</h4>
                            {chainBlobs.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Hash</th>
                                            <th>Size (bytes)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chainBlobs.map((blob) => (
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
                        </div>
                    </div>
                    <div className="card col fill">
                        <div className="chain-summary">
                            <h4>Latest block</h4>
                            <div className="card-item">
                                <span>Block index:</span>
                                <p className="value">{chainLatestBlock?.blockIndex}</p>
                            </div>
                            <div className="card-item">
                                <span>Last updated:</span>
                                <p className="value">{chainLatestBlock?.timestamp?.toISOString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card col fill">
                        <div className="chain-summary">
                            <h4>EVM</h4>
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
                        </div>
                    </div>
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

export default Chain;
