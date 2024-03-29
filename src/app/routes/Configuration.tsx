/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from "react";
import { WaspClientService, ServiceFactory } from "../../lib/classes";
import "./Route.scss";
import { KeyValueRow, InfoBox, LoadingInfo } from "../components";

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
    const [newConfigArrayBasedOnKeys, setNewConfigArrayBasedOnKeys] = useState([] as any[]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => {
            const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
            // The documentation generator doesn't support "any/dynamic" values and forces a string instead.
            // The API will still return a dynamic value
            // We therefore cast the map[string]string to map[string]never to make use of dynamic typing.
            const newConfig = (await waspClientService.node().getConfiguration()) as ConfigMap;
            setConfig(newConfig);
        })();
    }, []);

    useEffect(() => {
        if (config) {
            // To get the first part of the key before the first dot
            const configCategory = Object.keys(config).map(key => key.slice(0, Math.max(0, key.indexOf("."))));

            // To remove the duplicated keys
            const notDuplicatedConfigCategory = configCategory.filter(
                (item, index) => configCategory.indexOf(item) === index,
            );

            // To create an array of objects with the items that have the same key
            const newConfig = notDuplicatedConfigCategory.map(item => {
                const newObj = {
                    [item]: { [item]: config[item] },
                };
                for (const key in config) {
                    if (key.startsWith(item)) {
                        newObj[item][key] = config[key];
                    }
                }
                const newObjectWithoutFirstProperty = Object.keys(newObj[item])?.reduce((acc: any, key) => {
                    if (key !== item) {
                        acc[key] = newObj[item][key];
                    }
                    return acc;
                }, {});
                newObj[item] = newObjectWithoutFirstProperty;

                return newObj;
            });
            setNewConfigArrayBasedOnKeys(newConfig);
        }
    }, [config]);
    return (
        <div className="main">
            <div className="main-wrapper">
                <h2>Configuration</h2>
                <div className="content">
                    {newConfigArrayBasedOnKeys?.length > 0 ? (
                        <div className="grid-wrapper">
                            {newConfigArrayBasedOnKeys.map((item, index) => {
                                const key = Object.keys(item)[0];
                                const value = Object.values(item)[0] as any;
                                return (
                                    <InfoBox title={key} key={index}>
                                        {Object.entries(value).map(([keyVal, val]) =>
                                            (typeof val === "boolean" || typeof val === "string" ? (
                                                <KeyValueRow key={keyVal} keyText={keyVal} value={val} />
                                            ) : (
                                                <KeyValueRow
                                                    key={keyVal}
                                                    keyText={keyVal}
                                                    value={JSON.stringify(val)}
                                                />
                                            )),
                                        )}
                                    </InfoBox>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="grid-wrapper">
                            {Array.from({ length: 10 }).map((item, index) => (
                                <InfoBox key={index}>
                                    <LoadingInfo key={index} medium />
                                </InfoBox>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Configuration;
