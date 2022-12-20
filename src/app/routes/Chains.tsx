import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HealthBadIcon } from "../../assets/health-bad.svg";
import { ReactComponent as HealthGoodIcon } from "../../assets/health-good.svg";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./Chains.scss";
import { ChainInfoResponse } from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";

/**
 * Chains panel.
 * @returns The node to render.
 */
function Chains() {
    const [chains, setChains] = useState<ChainInfoResponse[] | null>(null);

    React.useEffect(() => {
        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getChains()
            .then(newChains => {
                setChains(newChains);
            });
    }, []);

    return (
        <div className="chains">
            <div className="chains-wrapper">
                <h2>Chains</h2>
                <div className="content">
                    {chains?.map(chain => (
                        <Link key={chain.chainID} to={`/chains/${chain.chainID}`} className="fill">
                            <div className="chains-summary-item">
                                <div className="chains-health-icon">
                                    {chain.isActive ? <HealthGoodIcon /> : <HealthBadIcon />}
                                </div>
                                <p className="chains-id" title={chain.chainID}>
                                    {chain.chainID}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chains;
