import "./ChainMessagesTable.scss";
import React from "react";
import { ChainMetrics } from "../../../services/wasp_client";

interface ChainMessagesTableProps {
    chainMetrics: ChainMetrics;
}

/**
 * L1 Chain Messages table.
 * @param root0
 * @param root0.chainMetrics
 * @params root0 L1 Chain messages table props.
 * @returns The node to render.
 */
function ChainMessagesTable({ chainMetrics }: ChainMessagesTableProps) {
    return (
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
                {Object.entries(chainMetrics).map(([key, val]: [string, StandardMessage]) => {
                    const name = METRICS_NAMES[key];
                    const inOrOut = key.startsWith("in") ? "IN" : "OUT";
                    const totalMessages = val.messages ?? 0;
                    const date = val.timestamp.valueOf() > 0 ? val.timestamp.toISOString() : "NEVER";
                    const lastMessage = val.lastMessage ? `${JSON.stringify(val.lastMessage).slice(0, 45)}...` : "";
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

export default ChainMessagesTable;
