import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceFactory, ChainMetrics, WaspClientService } from "../../lib/classes";
import { METRICS_NAMES } from "../../lib/constants";
import "./L1.scss";
import { ITableRow, StandardMessage } from "../../lib/interfaces";
import { formatDate } from "../../lib/utils";
import GoBackButton from "../components/layout/GoBackButton";
import InfoBox from "../components/layout/InfoBox";
import Table from "../components/layout/Table";

/**
 * L1 chain panel.
 * @returns The node to render.
 */
function L1Chain() {
    const [l1ChainMetrics, setChainL1Metrics] = useState<ChainMetrics | null | ITableRow[]>(null);
    const { chainID } = useParams();

    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .metrics()
            .getChainMetrics({ chainID })
            .then(metrics => {
                const chainMetricsArray = Object.entries(metrics as ChainMetrics | null[]).map(
                    ([key, val]: [string, StandardMessage]) => {
                        const name = METRICS_NAMES[key];
                        const typeInOrOut = key.startsWith("in") ? "IN" : "OUT";
                        const totalMessages = val.messages ?? 0;
                        const lastTime = val.timestamp.valueOf() > 0 ? formatDate(val.timestamp) : "-";
                        const lastMessage = val.lastMessage ? JSON.stringify(val.lastMessage, null, 2) : "";
                        return { name, typeInOrOut, totalMessages, lastTime, lastMessage };
                    },
                );
                setChainL1Metrics(chainMetricsArray);
            });
    }, []);

    return (
        <div className="l1">
            <div className="l1-wrapper">
                <div className="l1-header middle row">
                    <GoBackButton goTo="/l1" text="L1" />
                    <h2 className="margin-l-s l1-details-title">L1 Chain {chainID}</h2>
                </div>
                <div className="content">
                    <InfoBox title="L1 Chain metrics" cardClassName="last-card">
                        {l1ChainMetrics && (
                            <Table
                                tBody={l1ChainMetrics as ITableRow[]}
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

export default L1Chain;
