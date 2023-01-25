/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from "react";
import { ITableRow } from "../../lib/interfaces";
import "./Table.scss";
interface TableProps {
    tBody: ITableRow[];
    classNames?: string;
    tHead: string[];
}

// eslint-disable-next-line jsdoc/require-jsdoc
function Table({ tBody, classNames, tHead }: TableProps) {
    return (
        <div className="table-wrapper">
            <table cellSpacing={0} className={classNames ?? ""}>
                <thead>
                    <tr>
                        {tHead?.map((head: string, index: number) => (
                            <th key={index}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tBody?.length > 0 &&
                        tBody?.map((row: ITableRow, index: number) => (
                            <tr key={index}>
                                {Object.keys(row).map((key: string, rowIndex: number) => (
                                    <td key={rowIndex}>
                                        {key === "lastMessage" ? (
                                            <pre>
                                                <code>{row[key]}</code>
                                            </pre>
                                        ) : typeof row[key] === "boolean" ? (
                                            row[key] ? (
                                                <input type="checkbox" checked disabled />
                                            ) : (
                                                <input type="checkbox" disabled />
                                            )
                                        ) : (
                                            row[key]
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
Table.defaultProps = {
    classNames: "",
};
export default Table;
