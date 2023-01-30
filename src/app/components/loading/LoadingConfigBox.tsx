import React from "react";
import ContentLoader from "react-content-loader";

// eslint-disable-next-line jsdoc/require-jsdoc
export default function LoadingConfigBox() {
    return (
        <div className="card col fill">
            <div className="summary">
                <ContentLoader
                    speed={2}
                    height={140}
                    width={470}
                    viewBox="0 0 470 140"
                    backgroundColor="rgb(40, 50, 85)"
                    foregroundColor="rgb(33, 45, 80)"
                    className=""
                >
                    <rect x="0" y="0" rx="5" ry="5" width="250" height="17" />
                    <rect x="0" y="25" rx="5" ry="5" width="400" height="17" />
                    <rect x="0" y="50" rx="5" ry="5" width="300" height="17" />
                    <rect x="0" y="75" rx="5" ry="5" width="350" height="17" />
                    <rect x="0" y="100" rx="5" ry="5" width="270" height="17" />
                </ContentLoader>
            </div>
        </div>
    );
}
