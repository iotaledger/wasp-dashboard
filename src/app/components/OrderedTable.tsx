/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from "react";
import { CopyIcon } from "../../assets";
import { ITableRow } from "../../lib/interfaces";
import { copyToClipboard, truncateText } from "../../lib/utils";
import "./OrderedTable.scss";
import Tooltip from "./Tooltip";

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
    const [showCopiedTooltip, setShowCopiedTooltip] = useState<boolean>(false);
    const handleCopyToClipboard = (copyValue: string) => {
        copyToClipboard(copyValue)
            .then(() => setShowCopiedTooltip(true))
            .finally(() => setTimeout(() => setShowCopiedTooltip(false), 1500));
    };

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
                                    <td key={index} className="blue">
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
                                            <div className="truncate-item-wrapper">
                                                {truncateText(row[head.key] as string)}
                                                <Tooltip message="Copied" show={showCopiedTooltip}>
                                                    <button
                                                        className="tooltip-button"
                                                        type="button"
                                                        onClick={() => handleCopyToClipboard(row[head.key] as string)}
                                                    >
                                                        <CopyIcon />
                                                    </button>
                                                </Tooltip>
                                            </div>
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
