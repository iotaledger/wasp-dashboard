import React, { useState } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./Configuration.scss";
import { WaspClientService } from "../../services/waspClientService";

interface ConfigMap {
    [key: string]: never;
}

/**
 * Configuration panel.
 * @returns The node to render.
 */
function Configuration() {
    /**
     * The configuration dump.
     */
    const [config, setConfig] = useState<ConfigMap | null>(null);

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => {
            const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
            // The documentation generator doesn't support "any/dynamic" values and forces a string instead.
            // The API will still return a dynamic value
            // We therefore cast the map[string]string to map[string]never to make use of dynamic typing.
            const newConfig = await waspClientService.node().getConfiguration() as ConfigMap;
            setConfig(newConfig);
        })();
    });

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
