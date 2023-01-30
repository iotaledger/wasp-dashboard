import React from "react";
import ContentLoader from "react-content-loader";

// eslint-disable-next-line jsdoc/require-jsdoc
export default function LoadingChainContractsBox() {
    return (
        <div className="card col fill">
            <div className="summary">
                <div className="row middle spread margin-b-m">
                    <h4>Contracts</h4>
                </div>
                <ContentLoader
                    speed={2}
                    height={198}
                    width={280}
                    viewBox="0 0 280 198"
                    backgroundColor="rgb(40, 50, 85)"
                    foregroundColor="rgb(33, 45, 80)"
                >
                    <rect x="0" y="0" rx="5" ry="5" width="100" height="17" />
                    <rect x="0" y="25" rx="5" ry="5" width="130" height="17" />
                    <rect x="0" y="50" rx="5" ry="5" width="170" height="17" />
                    <rect x="0" y="75" rx="5" ry="5" width="90" height="17" />
                    <rect x="0" y="100" rx="5" ry="5" width="200" height="17" />
                    <rect x="0" y="125" rx="5" ry="5" width="100" height="17" />
                    <rect x="0" y="150" rx="5" ry="5" width="160" height="17" />
                    <rect x="0" y="175" rx="5" ry="5" width="150" height="17" />
                </ContentLoader>
            </div>
        </div>
    );
}
