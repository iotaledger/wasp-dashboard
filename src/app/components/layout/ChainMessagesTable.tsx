import "./ChainMessagesTable.scss";
import moment from "moment";
import React from "react";
import { ChainMetrics } from "../../../services/wasp_client";

interface ChainMessagesTableProps {
    chainMetrics: ChainMetrics;
}

/**
 * L1 Chain Messages table.
 * @param props L1 Chain Messages table props.
 * @returns The node to render.
 */
function ChainMessagesTable(props: ChainMessagesTableProps) {
    return (
        <table cellSpacing={0} className="chain-messages-table">
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
                {Object.entries(props.chainMetrics).map(([key, val]: [string, StandardMessage]) => {
                    const name = METRICS_NAMES[key];
                    const typeInOrOut = key.startsWith("in") ? "IN" : "OUT";
                    const totalMessages = val.messages ?? 0;
                    const date = val.timestamp.valueOf() > 0 ? formatDate(val.timestamp) : "-";
                    const lastMessage = val.lastMessage ? JSON.stringify(val.lastMessage, null, 2) : "";
                    return (
                        <tr key={key}>
                            <td>{name}</td>
                            <td>{typeInOrOut}</td>
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
    );
}

interface StandardMessage {
    messages?: number;
    timestamp: Date;
    lastMessage?: Record<string, unknown>;
}

const METRICS_NAMES: Record<string, string> = {
    inAliasOutput: "Alias output",
    inOnLedgerRequest: "On ledger request",
    inOutput: "Output",
    inStateOutput: "State output",
    inTxInclusionState: "InTxInclusionState",
    outPublishGovernanceTransaction: "Publish governance tx",
    outPullLatestOutput: "Pull latest output",
    outPullOutputByID: "Pull output by ID",
    outPullTxInclusionState: "Pull tx inclusion state"
};

/**
 *
 * @param date The date to format.
 * @returns The formatted date.
 */
function formatDate(date?: Date | null): string {
    if (!date) {
        return "-";
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

export default ChainMessagesTable;
