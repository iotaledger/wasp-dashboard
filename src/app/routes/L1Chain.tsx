import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./L1.scss";
import { ChainMetrics } from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";
import ChainMessagesTable from "../components/layout/ChainMessagesTable";
import GoBackButton from "../components/layout/GoBackButton";

/**
 * L1 chain panel.
 * @returns The node to render.
 */
function L1Chain() {
    const [l1ChainMetrics, setChainL1Metrics] = useState<ChainMetrics | null>(null);
    const { chainID } = useParams();

    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .metrics()
            .getChainMetrics({ chainID })
            .then(metrics => {
                setChainL1Metrics(metrics);
            });
    }, []);

    return (
        <div className="l1">
            <div className="l1-wrapper">
                <div className="l1-header middle row">
                    <GoBackButton goTo="/l1" text="L1" />
                    <h2 className="margin-l-s l1-details-title">L1 Chain {chainID}</h2>
                </div>
                <div className="content">
                    <div className="card col fill last-card">
                        <div className="l1-summary">
                            <h4>L1 Chain metrics</h4>
                            {l1ChainMetrics && <ChainMessagesTable chainMetrics={l1ChainMetrics} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default L1Chain;
