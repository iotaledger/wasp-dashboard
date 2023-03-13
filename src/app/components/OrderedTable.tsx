/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from "react";
import { CopiableValue } from ".";
import { Environment } from "../../environment";
import { ITableRow } from "../../lib/interfaces";
import { generateExplorerLink, truncateText } from "../../lib/utils";
import "./OrderedTable.scss";

interface TableHead {
    key: string;
    title: string;
}

interface OrderedTableProps {
    tBody: ITableRow[];
    classNames?: string;
    tHead: TableHead[];
}

// eslint-disable-next-line jsdoc/require-jsdoc
function OrderedTable({ tBody, classNames, tHead }: OrderedTableProps) {
    return (
        <div className="table-wrapper">
            <table cellSpacing={0} className={classNames ?? ""}>
                <thead>
                    <tr>
                        {tHead?.map((head: TableHead, index: number) => (
                            <th key={index}>{head.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tBody?.length > 0 &&
                        tBody?.map((row: ITableRow, bodyIndex: number) => (
                            <tr key={bodyIndex}>
                                {tHead?.map((head: TableHead, index: number) => (
                                    <td key={index}>
                                        {head.key === "lastMessage" ? (
                                            <pre>
                                                <code>{row[head.key]}</code>
                                            </pre>
                                        ) : typeof row[head.key] === "boolean" ? (
                                            row[head.key] ? (
                                                <input type="checkbox" checked disabled />
                                            ) : (
                                                <input type="checkbox" disabled />
                                            )
                                        ) : typeof row[head.key] === "string" && row[head.key]?.length > 18 ? (
                                            <CopiableValue value={row[head.key] as string}>
                                                {Environment.ExplorerUrl ? (
                                                    <a
                                                        href={generateExplorerLink(row[head.key] as string)}
                                                        className="explorer-link"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        {truncateText(row[head.key] as string)}
                                                    </a>
                                                ) : (
                                                    <React.Fragment>
                                                        {truncateText(row[head.key] as string)}
                                                    </React.Fragment>
                                                )}
                                            </CopiableValue>
                                        ) : (
                                            row[head.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
OrderedTable.defaultProps = {
    classNames: "",
};
export default OrderedTable;
