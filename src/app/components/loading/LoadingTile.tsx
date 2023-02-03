import React from "react";
import ContentLoader from "react-content-loader";

interface LoadingTileProps {
    displayHealth?: boolean;
    height?: number;
    yAxis?: number;
}

// eslint-disable-next-line jsdoc/require-jsdoc
const LoadingTile = ({ displayHealth, height, yAxis }: LoadingTileProps) => (
    <div className="tile-content">
        <div className="text-content">
            {displayHealth && (
                <div className="health-icon loader">
                    <ContentLoader
                        speed={2}
                        height="20"
                        width="100%"
                        backgroundColor="var(--loading-background)"
                        foregroundColor="var(--loading-foreground)"
                    >
                        <circle cx="10" cy="10" r="10" />
                    </ContentLoader>
                </div>
            )}

            <div className="text">
                <ContentLoader
                    speed={2}
                    height={height}
                    width="100%"
                    backgroundColor="var(--loading-background)"
                    foregroundColor="var(--loading-foreground)"
                >
                    <rect x="0" y={yAxis} rx="5" ry="5" width="100%" height="20" />
                </ContentLoader>
            </div>
        </div>
    </div>
);

LoadingTile.defaultProps = {
    displayHealth: false,
    height: 20,
    yAxis: 0,
};

export default LoadingTile;
