import "./ChainMessagesTable.scss";
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
        <table cellSpacing={0}>
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
                    const date = val.timestamp.valueOf() > 0 ? formatDateToDDMMYYYYHHMM(val.timestamp) : "NEVER";
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
    outPullTxInclusionState: "Pull tx inclusion state",
};

/**
 *
 * @param date
 * @returns
 */
function formatDateToDDMMYYYYHHMM(date?: Date | null) {
    if (!date) {
        return "-";
    }
    return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })
        .format(new Date(date))
        .replace(",", " -");
}
export default ChainMessagesTable;
