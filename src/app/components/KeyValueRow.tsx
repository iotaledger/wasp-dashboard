/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react/jsx-no-useless-fragment */
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import "./KeyValueRow.scss";
import { ILink } from "../../lib/interfaces";
import { formatDate } from "../../lib/utils";

interface KeyValueRowProps {
    keyText: string | ILink | undefined | null;
    value: string | number | boolean | ILink | undefined | null;
}

const KeyValueRow: React.FC<KeyValueRowProps> = ({ keyText, value }) => {
    const formattedDate = moment(value as string | Date, "\"YYYY-MM-DDTHH:mm:ss.000Z\"", true);
    const isValid = formattedDate.isValid();
    const valueWithoutQuotes = value?.toString().replace(/"/g, "");

    return (
        <div className="info-item">
            {typeof keyText === "string" ? (
                <span className="key">{keyText}:</span>
            ) : (
                <Link to={keyText?.url!}>
                    <span className="key">{keyText?.text}:</span>
                </Link>
            )}
            {typeof value === "string" || typeof value === "number" || typeof value === "boolean" ? (
                typeof value === "boolean" ? (
                    <input type="checkbox" checked={Boolean(value)} disabled />
                ) : (
                    <span className="value">{isValid ? formatDate(value as any) : valueWithoutQuotes}</span>
                )
            ) : (
                <Link to={value?.url!}>
                    <span className="key">{value?.text}</span>
                </Link>
            )}
        </div>
    );
};

export default KeyValueRow;
