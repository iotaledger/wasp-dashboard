/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { Link } from "react-router-dom";
import "./KeyValueRow.scss";
import { ILink } from "../../lib/interfaces";

interface KeyValueRowProps {
    keyText: string | ILink | undefined | null;
    value: string | number | boolean | ILink | undefined | null;
}

const KeyValueRow: React.FC<KeyValueRowProps> = ({ keyText, value }) => (
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
                <span className="value">{value}</span>
            )
        ) : (
            <Link to={value?.url!}>
                <span className="key">{value?.text}</span>
            </Link>
        )}
    </div>
);

export default KeyValueRow;
