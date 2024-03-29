import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    ServiceFactory,
    ChainMessageMetrics,
    WaspClientService,
    METRICS_NAMES,
    ITableRow,
    StandardMessage,
    formatDate,
} from "../../lib";
import "./L1.scss";
import { Breadcrumb, InfoBox, Table, Tile, LoadingTable } from "../components";

/**
 * L1 chain panel.
 * @returns The node to render.
 */
function L1Chain() {
    const [l1ChainMetrics, setChainL1Metrics] = useState<null | ITableRow[]>(null);
    const { chainID } = useParams();
    const l1ChainBreadcrumbs = [
        { goTo: "/l1", text: "L1" },
        { goTo: `/l1/${chainID}`, text: `L1 Chain ${chainID}` },
    ];
    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .metrics()
            .getChainMessageMetrics({ chainID })
            .then(metrics => {
                const chainMetricsArray = Object.entries(metrics as ChainMessageMetrics | null[])
                    .filter(
                        ([, val]: [string, StandardMessage]) =>
                            val.timestamp !== undefined && val.messages !== undefined,
                    )
                    .map(([key, val]: [string, StandardMessage]) => {
                        const name = METRICS_NAMES[key];
                        const typeInOrOut = key.startsWith("in") ? "IN" : "OUT";
                        const totalMessages = val.messages ?? 0;
                        const lastTime = val.timestamp.valueOf() > 0 ? formatDate(val.timestamp) : "-";
                        const lastMessage = val.lastMessage ? JSON.stringify(val.lastMessage, null, 2) : "";
                        return { name, typeInOrOut, totalMessages, lastTime, lastMessage };
                    });
                setChainL1Metrics(chainMetricsArray);
            })
            .catch(e => {
                setChainL1Metrics(null);
                console.error(e);
            });
    }, []);

    return (
        <div className="l1-main">
            <div className="l1-wrapper">
                <Breadcrumb breadcrumbs={l1ChainBreadcrumbs} />
                <div className="l1-header middle row">
                    <h2 className="l1-details-title">L1 Chain {chainID}</h2>
                </div>
                <div className="content">
                    <InfoBox title="L1 Chain metrics" cardClassName="last-card margin-t-s">
                        {l1ChainMetrics === null ? (
                            <LoadingTable large />
                        ) : (l1ChainMetrics?.length > 0 ? (
                            <Table
                                tBody={l1ChainMetrics}
                                tHead={["Message name", "Type", "Total", "Last time", "Last message"]}
                                classNames="chain-messages-table"
                            />
                        ) : (
                            <Tile primaryText="No metrics found." />
                        ))}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default L1Chain;
