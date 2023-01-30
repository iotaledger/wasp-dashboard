import React from "react";
import ContentLoader from "react-content-loader";

// eslint-disable-next-line jsdoc/require-jsdoc
export default function LoadingChainInfoBox() {
    return (
        <div className="card col fill">
            <div className="summary">
                <div className="row middle spread margin-b-m">
                    <h4>Info</h4>
                </div>
                <ContentLoader
                    speed={2}
                    height={225}
                    width={1000}
                    viewBox="0 0 1000 225"
                    backgroundColor="rgb(40, 50, 85)"
                    foregroundColor="rgb(33, 45, 80)"
                    className=""
                >
                    <rect x="0" y="0" rx="5" ry="5" width="600" height="17" />
                    <rect x="0" y="25" rx="5" ry="5" width="600" height="17" />
                    <rect x="0" y="50" rx="5" ry="5" width="200" height="17" />
                    <rect x="0" y="75" rx="5" ry="5" width="250" height="17" />
                    <rect x="0" y="100" rx="5" ry="5" width="300" height="17" />
                    <rect x="0" y="125" rx="5" ry="5" width="200" height="17" />
                    <rect x="0" y="150" rx="5" ry="5" width="250" height="17" />
                    <rect x="0" y="175" rx="5" ry="5" width="300" height="17" />
                    <rect x="0" y="200" rx="5" ry="5" width="230" height="17" />
                </ContentLoader>
            </div>
        </div>
    );
}
