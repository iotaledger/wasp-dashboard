import React from "react";
import ContentLoader from "react-content-loader";

interface LoadingTableProps {
    large?: boolean;
}
// eslint-disable-next-line jsdoc/require-jsdoc
function LoadingTable({ large }: LoadingTableProps): JSX.Element {
    return (
        <React.Fragment>
            {Array.from({ length: large ? 10 : 5 })
                .fill("")
                .map((e, i) => (
                    <ContentLoader
                        key={i}
                        height={30}
                        width="100%"
                        speed={2}
                        backgroundColor="var(--loading-background)"
                        foregroundColor="var(--loading-foreground)"
                    >
                        <rect x="0" y="13" rx="6" ry="6" width={200} height="17" />
                        <rect x="250" y="13" rx="6" ry="6" width={80} height="17" />
                        <rect x="383" y="13" rx="6" ry="6" width={490} height="17" />
                    </ContentLoader>
                ))}
        </React.Fragment>
    );
}

LoadingTable.defaultProps = {
    large: false,
};

export default LoadingTable;
