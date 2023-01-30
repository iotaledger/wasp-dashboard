import React from "react";
import ContentLoader from "react-content-loader";

// eslint-disable-next-line jsdoc/require-jsdoc
export default function LoadingChainCommitteeBox() {
    return (
        <div className="card col fill">
            <div className="summary">
                <div className="row middle spread margin-b-m">
                    <h4>Committee</h4>
                </div>
                <ContentLoader
                    speed={2}
                    height={43}
                    width={700}
                    viewBox="0 0 700 43"
                    backgroundColor="rgb(40, 50, 85)"
                    foregroundColor="rgb(33, 45, 80)"
                >
                    <rect x="0" y="0" rx="5" ry="5" width="600" height="17" />
                    <rect x="0" y="25" rx="5" ry="5" width="100" height="17" />
                </ContentLoader>
            </div>
        </div>
    );
}
