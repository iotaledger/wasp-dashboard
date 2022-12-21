/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { Link } from "react-router-dom";
import "./InfoItem.scss";

interface InfoItemProps {
    keyValue: string | undefined;
    value: string | number | null | undefined | boolean;
    url?: string;
    isKeyALink?: boolean;
    isValueALink?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ keyValue, value, url, isKeyALink, isValueALink }) => (
    <React.Fragment>
        {isKeyALink && url ? (
            <div key={keyValue} className="info-item">
                <Link to={url}>
                    <span className="link">{keyValue}:</span>
                </Link>
                <p className="value">{value}</p>
            </div>
        ) : (isValueALink && url ? (
            <div className="info-item">
                <span>{keyValue}:</span>
                <Link to={url}>
                    <p className="value link">{value}</p>
                </Link>
            </div>
        ) : (
            <div className="info-item" key={keyValue}>
                <span>{keyValue}:</span>

                {typeof value === "boolean" ? (
                    value ? (
                        <input type="checkbox" checked disabled />
                    ) : (
                        <input type="checkbox" disabled />
                    )
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
    url: "",
};
export default InfoItem;
