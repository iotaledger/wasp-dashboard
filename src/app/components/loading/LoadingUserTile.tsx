import React from "react";
import ContentLoader from "react-content-loader";

// eslint-disable-next-line jsdoc/require-jsdoc
export default function LoadingUserTile() {
    return (
        <div className="user-panel-item card">
            <div className="col user-data">
                <h4>Username</h4>
                <ContentLoader
                    speed={2}
                    height={19}
                    width={100}
                    viewBox="0 0 100 19"
                    backgroundColor="rgb(40, 50, 85)"
                    foregroundColor="rgb(33, 45, 80)"
                    className=""
                >
                    <rect x="0" y="3" rx="5" ry="5" width="100" height="16" />
                </ContentLoader>
                <div className="margin-t-s">
                    <h4>Permissions</h4>
                    <div className="permissions-wrapper">
                        <ContentLoader
                            speed={2}
                            height={19}
                            width={150}
                            viewBox="0 0 150 19"
                            backgroundColor="rgb(40, 50, 85)"
                            foregroundColor="rgb(33, 45, 80)"
                            className=""
                        >
                            <rect x="0" y="3" rx="5" ry="5" width="150" height="16" />
                        </ContentLoader>
                    </div>
                </div>
            </div>
        </div>
    );
}
