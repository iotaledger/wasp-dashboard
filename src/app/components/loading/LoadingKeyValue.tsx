import React from "react";
import ContentLoader from "react-content-loader";

interface LoadingKeyValueProps {
    large?: boolean;
}
// eslint-disable-next-line jsdoc/require-jsdoc
function LoadingKeyValue({ large }: LoadingKeyValueProps): JSX.Element {
    return (
        <ContentLoader
            speed={2}
            height={large ? 150 : 60}
            width="100%"
            backgroundColor="var(--loading-background)"
            foregroundColor="var(--loading-foreground)"
        >
            <rect x="0" y="0" rx="5" ry="5" width="280" height="20" />
            <rect x="0" y="30" rx="5" ry="5" width="250" height="20" />
            {large && (
                <React.Fragment>
                    <rect x="0" y="60" rx="5" ry="5" width="280" height="20" />
                    <rect x="0" y="90" rx="5" ry="5" width="250" height="20" />
                    <rect x="0" y="120" rx="5" ry="5" width="280" height="20" />
                </React.Fragment>
            )}
        </ContentLoader>
    );
}

LoadingKeyValue.defaultProps = {
    large: false,
};

export default LoadingKeyValue;
