/* eslint-disable react/jsx-no-useless-fragment */
import "./Tile.scss";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HealthGoodIcon } from "../../assets/health-good.svg";
import { ReactComponent as HealthWarning } from "../../assets/health-warning.svg";

interface TileProps {
    iconToggle?: boolean;
    id?: string;
    path?: string;
}

const Tile: React.FC<TileProps> = ({ iconToggle, id, path }) => (
    <React.Fragment>
        {path ? (
            <Link key={id} to={`/${path}/${id}`}>
                <div className="summary-item">
                    <div className="health-icon">{iconToggle ? <HealthGoodIcon /> : <HealthWarning />}</div>
                    <p className="id" title={id}>
                        {id}
                    </p>
                </div>
            </Link>
        ) : (
            <div className="summary-item">
                <div className="health-icon">{iconToggle ? <HealthGoodIcon /> : <HealthWarning />}</div>
                <p className="id" title={id}>
                    {id}
                </p>
            </div>
        )}
    </React.Fragment>
);

Tile.defaultProps = {
    iconToggle: false,
    id: "",
    path: "",
};

export default Tile;
