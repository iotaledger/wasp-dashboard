import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HealthBadIcon } from "../../assets/health-bad.svg";
import { ReactComponent as HealthGoodIcon } from "../../assets/health-good.svg";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./L1.scss";
import { NodeConfigService } from "../../services/nodeConfigService";
import { ChainInfoResponse, ChainMetrics, L1Params } from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";
import ChainMessagesTable from "../components/layout/ChainMessagesTable";

/**
 * L1 panel.
 * @returns The node to render.
 */
function L1() {
    const [l1Params, setL1Params] = useState<L1Params | null>(null);
    const [chains, setChains] = useState<ChainInfoResponse[] | null>(null);
    const [l1Metrics, setl1Metrics] = useState<ChainMetrics | null>(null);

    React.useEffect(() => {
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
    }, []);

    return (
        <div className="l1">
            <div className="l1-wrapper">
                <h2>L1</h2>
                <div className="content">
                    {l1Params && (
                        <div className="card col fill first-card">
                            <div className="l1-summary">
                                <h4>L1 params</h4>

                                {Object.entries(l1Params).map(([key, val]: [string, Record<string, string>]) => {
                                    const isObject = typeof val === "object";
                                    return (
                                        <div key={key} className="l1-info--item">
                                            <h4>{key}</h4>
                                            {isObject ? (
                                                <div>
                                                    {Object.entries(val).map(([prop, propVal]) => (
                                                        <div className="info--item" key={prop}>
                                                            <span>{prop}:</span>

                                                            {typeof propVal === "boolean" ? (
                                                                propVal ? (
                                                                    <input type="checkbox" checked disabled />
                                                                ) : (
                                                                    <input type="checkbox" disabled />
                                                                )
                                                            ) : (
                                                                <p> {`${propVal}`}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>{val}</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div className="card col fill">
                        <div className="l1-summary">
                            <h4>Chains</h4>
                            {chains?.map((chain) => (
                                <div key={chain.chainID} className="l1-summary--item">
                                    <div className="l1-health-icon">
                                        {chain.isActive ? <HealthGoodIcon /> : <HealthBadIcon />}
                                    </div>
                                    <p className="l1-id" title={chain.chainID}>
                                        <Link to={`/l1/${chain.chainID}`}>{chain.chainID}</Link>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card col fill last-card">
                        <div className="l1-summary">
                            <h4>L1 global metrics</h4>
                            {l1Metrics && <ChainMessagesTable chainMetrics={l1Metrics} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default L1;
