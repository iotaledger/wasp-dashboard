import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Route.scss";
import { WaspClientService, ServiceFactory } from "../../lib";
import { Breadcrumb, InfoBox, Tile, LoadingTile, ChainNavbar } from "../components";

/**
 * ChainAccount panel.
 * @returns The node to render.
 */
function ChainAccounts() {
    const [chainAccounts, setChainAccounts] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { chainID } = useParams();
    const chainURL = `/chains/${chainID}`;

    const chainBreadcrumbs = [
        { goTo: "/", text: "Home" },
        { goTo: chainURL, text: `Chain ${chainID}` },
        { goTo: `${chainURL}/accounts`, text: "Accounts" },
    ];

    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        setIsLoading(true);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .accountsGetAccounts({ chainID })
            .then(newAccounts => {
                if (newAccounts.accounts) {
                    setChainAccounts(newAccounts.accounts);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                setChainAccounts([]);
            });
    }, []);

    return (
        <div className="main">
            <div className="main-wrapper">
                <Breadcrumb breadcrumbs={chainBreadcrumbs} />
                <div className="middle row">
                    <h2 className="l1-details-title">Chain {chainID}</h2>
                </div>
                <div className="content">
                    <ChainNavbar chainID={chainID} />
                    <InfoBox title="On-chain accounts">
                        {isLoading ? (
                            Array.from({ length: 2 }).map((_, i) => <LoadingTile key={i} />)
                        ) : (chainAccounts.length > 0 ? (
                            chainAccounts.map(account => (
                                <Tile
                                    key={account}
                                    primaryText={account}
                                    url={`/chains/${chainID}/accounts/${account}`}
                                />
                            ))
                        ) : (
                            <Tile primaryText="No accounts found." />
                        ))}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default ChainAccounts;
