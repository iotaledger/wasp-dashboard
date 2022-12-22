/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { Link } from "react-router-dom";
import "./InfoItem.scss";

interface InfoItemProps {
    keyText: string | undefined;
    value: string | number | null | undefined | boolean;
    url?: string;
    isKeyALink?: boolean;
    isValueALink?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ keyText, value, url, isKeyALink, isValueALink }) => (
    <React.Fragment>
        {isKeyALink && url ? (
            <div key={keyText} className="info-item">
                <Link to={url}>
                    <span className="link">{keyText}:</span>
                </Link>
                <p className="value">{value}</p>
            </div>
        ) : (isValueALink && url ? (
            <div className="info-item">
                <span>{keyText}:</span>
                <Link to={url}>
                    <p className="value link">{value}</p>
                </Link>
            </div>
        ) : (
            <div className="info-item" key={keyText}>
                <span>{keyText}:</span>

                {typeof value === "boolean" ? (
                    <input type="checkbox" checked={Boolean(value)} disabled />
                ) : (
                    <p> {`${value}`}</p>
                )}
            </div>
        ))}
    </React.Fragment>
);

InfoItem.defaultProps = {
    isKeyALink: false,
    isValueALink: false,
    url: undefined,
};
export default InfoItem;
