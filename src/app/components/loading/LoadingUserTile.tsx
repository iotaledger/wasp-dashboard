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
                    backgroundColor="var(--loading-background)"
                    foregroundColor="var(--loading-foreground)"
                >
                    <rect x="0" y="8" rx="5" ry="5" width="100" height="11" />
                </ContentLoader>
                <div className="margin-t-s">
                    <h4>Permissions</h4>
                    <div className="permissions-wrapper">
                        <ContentLoader
                            speed={2}
                            height={19}
                            width={150}
                            viewBox="0 0 150 19"
                            backgroundColor="var(--loading-background)"
                            foregroundColor="var(--loading-foreground)"
                        >
                            <rect x="0" y="8" rx="5" ry="5" width="150" height="11" />
                        </ContentLoader>
                    </div>
                </div>
            </div>
        </div>
    );
}
