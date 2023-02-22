/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable unicorn/no-nested-ternary */
import { Converter } from "@iota/util.js";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import "./KeyValueRow.scss";
import { ILink } from "../../lib/interfaces";
import { formatDate } from "../../lib/utils";

interface KeyValueRowProps {
    keyText: string | ILink | undefined | null;
    value: string | number | boolean | ILink | Date | undefined | null;
    showUTFStrings?: boolean;
}

const KeyValueRow: React.FC<KeyValueRowProps> = ({ keyText, value, showUTFStrings }) => {
    const isValid = dayjs(value as string | Date).isValid();
    const valueWithoutQuotes = value?.toString().replace(/"/g, "");

    return (
        <div className="info-item">
            {typeof keyText === "string" ? (
                <span className="key">{showUTFStrings ? `${Converter.hexToUtf8(keyText)}:` : `${keyText}:`}</span>
            ) : (
                <Link to={keyText?.url!}>
                    <span className="key">{keyText?.text}:</span>
                </Link>
            )}
            {value instanceof Date ? (
                <span className="value">{isValid ? formatDate(value) : valueWithoutQuotes}</span>
            ) : typeof value === "boolean" ? (
                <input type="checkbox" checked={Boolean(value)} disabled />
            ) : typeof value === "string" ? (
                <span className="value">
                    {showUTFStrings ? `"${Converter.hexToUtf8(valueWithoutQuotes!)}"` : valueWithoutQuotes}
                </span>
            ) : typeof value === "number" ? (
                <span className="value">{valueWithoutQuotes}</span>
            ) : (
                <Link to={value?.url!}>
                    <span className="key">{value?.text}</span>
                </Link>
            )}
        </div>
    );
};

KeyValueRow.defaultProps = {
    showUTFStrings: false,
};

export default KeyValueRow;
