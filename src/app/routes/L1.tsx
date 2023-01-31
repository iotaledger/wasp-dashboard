import React, { useState } from "react";
import {
    ServiceFactory,
    NodeConfigService,
    ChainInfoResponse,
    ChainMetrics,
    L1Params,
    WaspClientService,
    METRICS_NAMES,
    ITableRow,
    StandardMessage,
    formatDate,
} from "../../lib";
import "./L1.scss";
import { KeyValueRow, InfoBox, Table, Tile, LoadingTile } from "../components";

/**
 * L1 panel.
 * @returns The node to render.
 */
function L1() {
    const [l1Params, setL1Params] = useState<L1Params | null>(null);
    const [chains, setChains] = useState<ChainInfoResponse[] | null>(null);
    const [l1Metrics, setl1Metrics] = useState<ChainMetrics | null | ITableRow[]>(null);

    React.useEffect(() => {
        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
        const nodeService = ServiceFactory.get<NodeConfigService>(NodeConfigService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        nodeService.initialize().then(() => {
            const params = nodeService.getL1Params();
            if (params) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
                const chainMetricsArray = Object.entries(metrics as ChainMetrics | null[]).map(
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
                setl1Metrics(chainMetricsArray);
            });
    }, []);

    return (
        <div className="l1-main">
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
                                                    <KeyValueRow key={prop} keyText={prop} value={propVal} />
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
                        {chains
                            ? chains.map(chain => (
                                <Tile
                                    key={chain.chainID}
                                    primaryText={chain.chainID}
                                    url={`/l1/${chain.chainID}`}
                                    displayHealth
                                    healthy={chain.isActive}
                                />
                              ))
                            : Array.from({ length: 2 }).map((_, i) => (
                                <LoadingTile yAxis={8} height={38} key={i} displayHealth={true} />
                              ))}
                    </InfoBox>
                    <InfoBox title="L1 global metrics" cardClassName="last-card">
                        {l1Metrics ? (
                            <Table
                                tBody={l1Metrics as ITableRow[]}
                                tHead={["Message name", "Type", "Total", "Last time", "Last message"]}
                                classNames="chain-messages-table"
                            />
                        ) : (
                            <Tile primaryText="No L1 metrics found." />
                        )}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default L1;
