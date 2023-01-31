import React from "react";
import ContentLoader from "react-content-loader";
import { ReactComponent as HealthGoodIcon } from "../../../assets/health-good.svg";

interface LoadingTileProps {
    displayHealth?: boolean;
    width?: number;
    height?: number;
}

// eslint-disable-next-line jsdoc/require-jsdoc
const LoadingTile = ({ displayHealth, width, height }: LoadingTileProps) => (
    <div className="tile-content">
        <div className="text-content">
            {displayHealth && (
                <div className="health-icon">
                    <HealthGoodIcon />
                </div>
            )}

            <div className="text">
                <ContentLoader
                    speed={2}
                    height={height}
                    width={width}
                    viewBox={`0 0 ${width} ${height}`}
                    backgroundColor="var(--loading-background)"
                    foregroundColor="var(--loading-foreground)"
                >
                    <rect x="0" y="8" rx="5" ry="5" width={width} height="20" />
                </ContentLoader>
            </div>
        </div>
    </div>
);

LoadingTile.defaultProps = {
    displayHealth: false,
    height: 28,
    width: 350,
};

export default LoadingTile;
