import React, { useState } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./L1.scss";
import { NodeConfigService } from "../../services/nodeConfigService";
import { ChainInfoResponse, ChainMetrics, L1Params } from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";
import InfoItem from "../components/InfoItem";
import ChainMessagesTable from "../components/layout/ChainMessagesTable";
import InfoBox from "../components/layout/InfoBox";
import Tile from "../components/Tile";

/**
 * L1 panel.
 * @returns The node to render.
 */
function L1() {
    const [l1Params, setL1Params] = useState<L1Params | null>(null);
    const [chains, setChains] = useState<ChainInfoResponse[] | null>(null);
    const [l1Metrics, setl1Metrics] = useState<ChainMetrics | null>(null);

    React.useEffect(() => {
        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
        const nodeService = ServiceFactory.get<NodeConfigService>(NodeConfigService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        nodeService.initialize().then(() => {
            const params = nodeService.getL1Params();
            if (params) {
                setL1Params(params);
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getChains()
            .then(newChains => {
                setChains(newChains);
            });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .metrics()
            .getL1Metrics()
            .then(metrics => {
                setl1Metrics(metrics);
            });
    }, []);

    return (
        <div className="l1">
            <div className="l1-wrapper">
                <h2>L1</h2>
                <div className="content">
                    {l1Params && (
                        <InfoBox title="L1 params" cardClassName="first-card">
                            {Object.entries(l1Params).map(([key, val]: [string, Record<string, string>]) => {
                                const isObject = typeof val === "object";
                                return (
                                    <div key={key} className="l1-info-item">
                                        <h4>{key}</h4>
                                        {isObject ? (
                                            <div>
                                                {Object.entries(val).map(([prop, propVal]) => (
                                                    <InfoItem key={prop} keyValue={prop} value={propVal} />
                                                ))}
                                            </div>
                                        ) : (
                                            <p>{val}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </InfoBox>
                    )}
                    <InfoBox title="Chains">
                        {chains?.map(chain => (
                            <Tile iconToggle={chain.isActive} key={chain.chainID} id={chain.chainID} path="l1" />
                        ))}
                    </InfoBox>
                    <InfoBox title="L1 global metrics" cardClassName="last-card">
                        {l1Metrics && <ChainMessagesTable chainMetrics={l1Metrics} />}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default L1;
