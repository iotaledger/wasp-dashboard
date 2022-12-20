/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./Configuration.scss";
import { WaspClientService } from "../../services/waspClientService";
import InfoBox from "../components/layout/InfoBox";

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
        <div className="configuration">
            <div className="content">
                <h2>Configuration</h2>
                <div className="margin-t-s">
                    {newConfigArrayBasedOnKeys && (
                        <div className="wrapper">
                            {newConfigArrayBasedOnKeys.map((item, index) => {
                                const key = Object.keys(item)[0];
                                const value = Object.values(item)[0] as any;
                                return (
                                    <InfoBox title={key} key={index} titleClassName="key">
                                        {Object.entries(value).map(([keyVal, val], valueIndex) =>
                                            (typeof val === "boolean" ? (
                                                val ? (
                                                    <div key={valueIndex} className="card-item">
                                                        <span>{keyVal}:</span>
                                                        <input type="checkbox" checked disabled />
                                                    </div>
                                                ) : (
                                                    <div key={valueIndex} className="card-item">
                                                        <span>{keyVal}:</span>
                                                        <input type="checkbox" disabled />
                                                    </div>
                                                )
                                            ) : (typeof val === "string" ? (
                                                <div key={valueIndex} className="card-item">
                                                    <span>{keyVal}:</span>
                                                    <p className="value">{val}</p>
                                                </div>
                                            ) : (
                                                <div key={valueIndex} className="card-item">
                                                    <span>{keyVal}:</span>
                                                    <p className="value">{JSON.stringify(val)}</p>
                                                </div>
                                            ))),
                                        )}
                                    </InfoBox>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Configuration;
