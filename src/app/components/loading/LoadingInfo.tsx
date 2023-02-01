import React from "react";
import ContentLoader from "react-content-loader";

interface LoadingInfoProps {
    large?: boolean;
    medium?: boolean;
    extraLarge?: boolean;
}
// eslint-disable-next-line jsdoc/require-jsdoc
function LoadingInfo({ large, medium, extraLarge }: LoadingInfoProps): JSX.Element {
    return (
        <ContentLoader
            speed={2}
            // eslint-disable-next-line unicorn/no-nested-ternary
            height={large ? 200 : medium ? 150 : extraLarge ? 235 : 60}
            width="100%"
            backgroundColor="var(--loading-background)"
            foregroundColor="var(--loading-foreground)"
        >
            <rect x="0" y="0" rx="5" ry="5" width="280" height="17" />
            <rect x="0" y="30" rx="5" ry="5" width="250" height="17" />

            {medium && (
                <React.Fragment>
                    <rect x="0" y="60" rx="5" ry="5" width="280" height="17" />
                    <rect x="0" y="90" rx="5" ry="5" width="250" height="17" />
                    <rect x="0" y="120" rx="5" ry="5" width="280" height="17" />
                </React.Fragment>
            )}

            {large && (
                <React.Fragment>
                    <rect x="0" y="60" rx="5" ry="5" width="280" height="17" />
                    <rect x="0" y="90" rx="5" ry="5" width="250" height="17" />
                    <rect x="0" y="117" rx="5" ry="5" width="280" height="17" />
                    <rect x="0" y="150" rx="5" ry="5" width="280" height="17" />
                    <rect x="0" y="180" rx="5" ry="5" width="250" height="17" />
                </React.Fragment>
            )}

            {extraLarge && (
                <React.Fragment>
                    <rect x="0" y="60" rx="5" ry="5" width="280" height="17" />
                    <rect x="0" y="90" rx="5" ry="5" width="250" height="17" />
                    <rect x="0" y="117" rx="5" ry="5" width="280" height="17" />
                    <rect x="0" y="150" rx="5" ry="5" width="280" height="17" />
                    <rect x="0" y="180" rx="5" ry="5" width="250" height="17" />
                    <rect x="0" y="210" rx="5" ry="5" width="280" height="17" />
                </React.Fragment>
            )}
        </ContentLoader>
    );
}

LoadingInfo.defaultProps = {
    extraLarge: false,
    large: false,
    medium: false,
};

export default LoadingInfo;
