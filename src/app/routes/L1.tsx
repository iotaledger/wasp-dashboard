import React, { useState } from "react";
import { ReactComponent as HealthBadIcon } from "../../assets/health-bad.svg";
import { ReactComponent as HealthGoodIcon } from "../../assets/health-good.svg";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./L1.scss";
import { NodeConfigService } from "../../services/nodeConfigService";
import { ChainInfoResponse, ChainMetrics, L1Params } from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";

/**
 * L1 panel.
 * @returns The node to render.
 */
function L1() {
    const [l1Params, setL1Params] = useState<L1Params | null>(null);
    const [chains, setChains] = useState<ChainInfoResponse[] | null>(null);
    const [l1Metrics, setl1Metrics] = useState<ChainMetrics | null>(null);

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => {
            const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
            const nodeService = ServiceFactory.get<NodeConfigService>(NodeConfigService.ServiceName);

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            nodeService.initialize().then(() => {
                const params = nodeService.getL1Params();
                if (params) {
                    setL1Params(params);
                }
            });

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            waspClientService
                .chains()
                .getChains()
                .then((newChains) => {
                    setChains(newChains);
                });

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            waspClientService
                .metrics()
                .getL1Metrics()
                .then((metrics) => {
                    setl1Metrics(metrics);
                });
        })();
    }, []);

    return (
        <div className="l1">
            <div className="content">
                <div className="group column">
                    <div className="group">
                        <div className="card col fill">
                            <div className="l1-summary">
                                <h4>L1 params</h4>
                                {l1Params &&
                                    Object.entries(l1Params).map(([key, val]: [string, Record<string, string>]) => {
                                        const isObject = typeof val === "object";
                                        return (
                                            <div key={key} className="l1-info--item">
                                                <h2>{key}</h2>
                                                {isObject ? (
                                                    <ul>
                                                        {Object.entries(val).map(([prop, propVal]) => (
                                                            <li key={prop}>
                                                                <b>{prop}:</b> {`${propVal}`}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>{val}</p>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="card col">
                            <div className="l1-summary">
                                <h4>Chains</h4>
                                {chains?.map((chain) => (
                                    <div key={chain.chainID} className="l1-summary--item">
                                        <div className="l1-health-icon">
                                            {chain.isActive ? <HealthGoodIcon /> : <HealthBadIcon />}
                                        </div>
                                        <p className="l1-id" title={chain.chainID}>
                                            {addressShorter(chain.chainID)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="card col fill">
                        <div className="l1-summary">
                            <h4>L1 metrics</h4>
                            {l1Metrics && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Message name</th>
                                            <th>Type</th>
                                            <th>Total</th>
                                            <th>Last time</th>
                                            <th>Last message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(l1Metrics).map(([key, val]: [string, StandardMessage]) => {
                                            const name = METRICS_NAMES[key];
                                            const inOrOut = key.startsWith("in") ? "IN" : "OUT";
                                            const totalMessages = val.messages ?? 0;
                                            const date =
                                                val.timestamp.valueOf() > 0 ? val.timestamp.toISOString() : "NEVER";
                                            const lastMessage = val.lastMessage
                                                ? `${JSON.stringify(val.lastMessage).slice(0, 45)}...`
                                                : "";
                                            return (
                                                <tr key={key}>
                                                    <td>{name}</td>
                                                    <td>{inOrOut}</td>
                                                    <td>{totalMessages}</td>
                                                    <td>{date}</td>
                                                    <td>
                                                        <pre>
                                                            <code>{lastMessage}</code>
                                                        </pre>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StandardMessage {
    messages?: number;
    timestamp: Date;
    lastMessage?: Record<string, unknown>;
}

const addressShorter = (addr?: string) => `${addr?.slice(0, 30)}...`;

const METRICS_NAMES: Record<string, string> = {
    inAliasOutput: "Alias output",
    inOnLedgerRequest: "On ledger request",
    inOutput: "Output",
    inStateOutput: "State output",
    inTxInclusionState: "InTxInclusionState",
    outPublishGovernanceTransaction: "Publish governance tx",
    outPullLatestOutput: "Pull latest output",
    outPullOutputByID: "Pull output by ID",
    outPullTxInclusionState: "Pull tx inclusion state",
};

export default L1;
