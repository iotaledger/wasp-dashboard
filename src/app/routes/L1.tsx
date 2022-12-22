import React, { useEffect, useState } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./L1.scss";
import { METRICS_NAMES } from "../../lib/constants";
import { StandardMessage } from "../../lib/interfaces";
import { formatDate } from "../../lib/utils";
import { NodeConfigService } from "../../services/nodeConfigService";
import { ChainInfoResponse, ChainMetrics, L1Params } from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";
import InfoItem from "../components/InfoItem";
import InfoBox from "../components/layout/InfoBox";
import Table from "../components/layout/Table";
import Tile from "../components/Tile";

/**
 * L1 panel.
 * @returns The node to render.
 */
function L1() {
    const [l1Params, setL1Params] = useState<L1Params | null>(null);
    const [chains, setChains] = useState<ChainInfoResponse[] | null>(null);
    const [l1Metrics, setl1Metrics] = useState<ChainMetrics | null>(null);
    const [newL1MetricsArrayBasedOnKeys, setNewL1MetricsArrayBasedOnKeys] = useState<unknown[]>([]);

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
            .then(newChains => {
                setChains(newChains);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .metrics()
            .getL1Metrics()
            .then(metrics => {
                setl1Metrics(metrics);
            });
    }, []);
    useEffect(() => {
        if (l1Metrics) {
            const chainMetricsArray = Object.entries(l1Metrics as ChainMetrics | null[]).map(
                ([key, val]: [string, StandardMessage]) => {
                    const name = METRICS_NAMES[key];
                    const typeInOrOut = key.startsWith("in") ? "IN" : "OUT";
                    const totalMessages = val.messages ?? 0;
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    const date = val.timestamp.valueOf() > 0 ? formatDate(val.timestamp) : "-";
                    const lastMessage = val.lastMessage ? JSON.stringify(val.lastMessage, null, 2) : "";
                    return {
                        name,
                        typeInOrOut,
                        totalMessages,
                        date,
                        lastMessage,
                    };
                },
            );
            setNewL1MetricsArrayBasedOnKeys(chainMetricsArray);
        }
    }, [l1Metrics]);
    return (
        <div className="l1">
            <div className="l1-wrapper">
                <h2>L1</h2>
                <div className="content">
                    {l1Params && (
                        <InfoBox title="L1 params" cardClassName="first-card">
                            {Object.entries(l1Params).map(([key, val]: [string, Record<string, string>]) => {
                                const isObject = typeof val === "object";
                                return (
                                    <div key={key} className="l1-info-item">
                                        <h4>{key}</h4>
                                        {isObject ? (
                                            <div>
                                                {Object.entries(val).map(([prop, propVal]) => (
                                                    <InfoItem key={prop} keyText={prop} value={propVal} />
                                                ))}
                                            </div>
                                        ) : (
                                            <p>{val}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </InfoBox>
                    )}
                    <InfoBox title="Chains">
                        {chains?.map(chain => (
                            <Tile healthy={chain.isActive} key={chain.chainID} id={chain.chainID} path="l1" />
                        ))}
                    </InfoBox>
                    <InfoBox title="L1 global metrics" cardClassName="last-card">
                        {l1Metrics && (
                            <Table
                                tBody={newL1MetricsArrayBasedOnKeys}
                                tHead={["Message name", "Type", "Total", "Last time", "Last message"]}
                                classNames="chain-messages-table"
                            />
                        )}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default L1;
