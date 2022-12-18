import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./L1.scss";
import { ChainMetrics } from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";
import ChainMessagesTable from "../components/layout/ChainMessagesTable";

/**
 * L1 chain panel.
 * @returns The node to render.
 */
function L1Chain() {
    const [l1ChainMetrics, setChainL1Metrics] = useState<ChainMetrics | null>(null);
    const location = useLocation();
    const chainID = location.pathname.replace("/l1/", "");

    React.useEffect(() => {
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
                <h2>L1 Chain {chainID}</h2>
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
