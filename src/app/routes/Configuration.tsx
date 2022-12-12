import React, { useState } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./Configuration.scss";
import { ConfigResponse } from "../../services/wasp_client/models";
import { WaspClientService } from "../../services/waspClientService";

/**
 * Configuration panel.
 * @returns The node to render.
 */
function Configuration() {
    /**
     * The configuration dump.
     */
    const [config, setConfig] = useState<ConfigResponse | null>(null);

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => {
            const waspClientService = ServiceFactory.get<WaspClientService>("wasp-client");
            const newConfig = await waspClientService.node().getConfiguration();
            setConfig(newConfig);
        })();
    }, []);

    return (
        <div className="configuration">
            <div className="content">
                <h2>Configuration</h2>
                {config && (
                    <dl>
                        {Object.entries(config).map(([key, val]) => {
                            const stringifiedVal = typeof val === "string" ? val : JSON.stringify(val);
                            return (
                                <React.Fragment key={key}>
                                    <dt>
                                        <code>{key}:</code>
                                    </dt>
                                    <dd>
                                        <code>{stringifiedVal}</code>
                                    </dd>
                                </React.Fragment>
                            );
                        })}
                    </dl>
                )}
            </div>
        </div>
    );
}

export default Configuration;
