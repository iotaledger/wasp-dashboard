/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import "./Table.scss";
import React from "react";

interface TableProps {
    tBody: any;
    classNames?: string;
    tHead: string[];
}

// eslint-disable-next-line jsdoc/require-jsdoc
function Table({ tBody, classNames, tHead }: TableProps) {
    return (
        <table cellSpacing={0} className={classNames ?? ""} style={{ width: "100%" }}>
            <thead>
                <tr>
                    {tHead?.map((head: string, index: number) => (
                        <th key={index}>{head}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tBody?.length > 0 &&
                    tBody?.map((row: any, index: number) => (
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
    );
}
Table.defaultProps = {
    classNames: "",
};
export default Table;
