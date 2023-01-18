import React, { useState } from "react";
import { WaspClientService, ServiceFactory, ChainInfoResponse } from "../../lib/classes";
import "./Route.scss";
import { Tile } from "../components";

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
        <div className="main">
            <div className="main-wrapper">
                <h2>Chains</h2>
                <div className="content">
                    {chains?.map(chain => (
                        <Tile
                            key={chain.chainID}
                            primaryText={chain.chainID}
                            url={`/chains/${chain.chainID}`}
                            displayHealth
                            healthy={chain.isActive}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chains;
