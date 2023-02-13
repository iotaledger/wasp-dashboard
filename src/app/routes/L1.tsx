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
import { KeyValueRow, InfoBox, Table, Tile, LoadingTile, LoadingInfo, LoadingTable } from "../components";

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
        nodeService
            .initialize()
            .then(() => {
                const params = nodeService.getL1Params();
                if (params) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setL1Params(params);
                }
            })
            .catch(e => {
                console.error(e);
                setL1Params(null);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getChains()
            .then(newChains => {
                setChains(newChains);
            })
            .catch(e => {
                console.error(e);
                setChains(null);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .metrics()
            .getL1Metrics()
            .then(metrics => {
                const chainMetricsArray = Object.entries(metrics as ChainMetrics | null[])
                    .filter(
                        ([, val]: [string, StandardMessage]) =>
                            val.timestamp !== undefined && val.messages !== undefined,
                    )
                    .map(([key, val]: [string, StandardMessage]) => {
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
                    });
                setl1Metrics(chainMetricsArray);
            })
            .catch(e => {
                console.error(e);
                setl1Metrics(null);
            });
    }, []);

    return (
        <div className="l1-main">
            <div className="l1-wrapper">
                <h2>L1</h2>
                <div className="content">
                    <div className="cols-wrapper">
                        <InfoBox title="L1 params" cardClassName="first-card">
                            {l1Params === null ? (
                                <LoadingInfo large />
                            ) : (
                                l1Params &&
                                Object.entries(l1Params).map(([key, val]: [string, Record<string, string>]) => {
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
                                })
                            )}
                        </InfoBox>
                        <InfoBox title="Chains">
                            {chains === null ? (
                                Array.from({ length: 1 }).map((_, i) => (
                                    <LoadingTile yAxis={8} height={38} key={i} displayHealth={true} />
                                ))
                            ) : (chains?.length > 0 ? (
                                chains.map(chain => (
                                    <Tile
                                        key={chain.chainID}
                                        primaryText={chain.chainID}
                                        url={`/l1/${chain.chainID}`}
                                        displayHealth
                                        healthy={chain.isActive}
                                    />
                                ))
                            ) : (
                                <Tile primaryText="No chains found." />
                            ))}
                        </InfoBox>
                    </div>
                    <InfoBox title="L1 global metrics" cardClassName="last-card">
                        {l1Metrics === null ? (
                            <LoadingTable large />
                        ) : ((l1Metrics as ITableRow[])?.length > 0 ? (
                            <Table
                                tBody={l1Metrics as ITableRow[]}
                                tHead={["Message name", "Type", "Total", "Last time", "Last message"]}
                                classNames="chain-messages-table"
                            />
                        ) : (
                            <Tile primaryText="No L1 metrics found." />
                        ))}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default L1;
