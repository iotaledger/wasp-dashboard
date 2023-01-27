/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-no-useless-fragment */
import "./Tile.scss";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HealthGoodIcon } from "../../assets/health-good.svg";
import { ReactComponent as HealthWarning } from "../../assets/health-warning.svg";
import { IAction } from "../../lib";
import IconButton from "./IconButton";

interface TileProps {
    displayHealth?: boolean | undefined;
    healthy?: boolean | undefined;
    primaryText: string | undefined;
    secondaryText?: string | undefined;
    url?: string | undefined;
    actions?: IAction[] | undefined;
}

const TileContent: React.FC<TileProps> = ({
    actions,
    displayHealth,
    healthy,
    primaryText,
    secondaryText,
    url,
}: TileProps) => (
    <div className={`tile-content ${url ? "clickable" : ""}`}>
        <div className="text-content">
            {displayHealth && <div className="health-icon">{healthy ? <HealthGoodIcon /> : <HealthWarning />}</div>}
            <div className="text">
                <p className="primary">{primaryText}</p>
                {secondaryText && <p className="secondary">{secondaryText}</p>}
            </div>
        </div>
        {actions?.length && (
            <div className="actions">
                {actions.map(action => (
                    <IconButton key={action.text} icon={action.icon} type={action.type} onClick={action.handleAction} />
                ))}
            </div>
        )}
        {url && <div className="arrow">{">"}</div>}
    </div>
);

const Tile: React.FC<TileProps> = ({ actions, displayHealth, healthy, primaryText, secondaryText, url }) => (
    <React.Fragment>
        {url ? (
            <Link to={url}>
                <TileContent
                    actions={actions}
                    displayHealth={displayHealth}
                    healthy={healthy}
                    primaryText={primaryText}
                    secondaryText={secondaryText}
                    url={url}
                />
            </Link>
        ) : (
            <TileContent
                actions={actions}
                displayHealth={displayHealth}
                healthy={healthy}
                primaryText={primaryText}
                secondaryText={secondaryText}
            />
        )}
    </React.Fragment>
);

Tile.defaultProps = {
    actions: undefined,
    displayHealth: false,
    healthy: false,
    secondaryText: undefined,
    url: undefined,
};

export default Tile;
