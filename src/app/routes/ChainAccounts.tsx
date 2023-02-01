import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Route.scss";
import { WaspClientService, ServiceFactory } from "../../lib";
import { Breadcrumb, Tile, ChainNavbar, Paginator } from "../components";

const SEARCH_ACCOUNT_PLACEHOLDER = "Account address";
const PAGE_SIZE = 5;

// eslint-disable-next-line jsdoc/require-jsdoc
function searchFilter(item: string, search: string) {
    return item.match(search);
}

/**
 * ChainAccount panel.
 * @returns The node to render.
 */
function ChainAccounts() {
    const [chainAccounts, setChainAccounts] = useState<string[]>([]);
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

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .accountsGetAccounts({ chainID })
            .then(newAccounts => {
                if (newAccounts.accounts) {
                    setChainAccounts(newAccounts.accounts);
                }
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
                    <Paginator
                        searchPlaceholder={SEARCH_ACCOUNT_PLACEHOLDER}
                        searchFilter={searchFilter}
                        title="On-chain accounts"
                        navUrl={`/chains/${chainID}/accounts/`}
                        data={chainAccounts}
                        size={PAGE_SIZE}
                    >
                        {account => (
                            <Tile key={account} primaryText={account} url={`/chains/${chainID}/account/${account}`} />
                        )}
                    </Paginator>
                </div>
            </div>
        </div>
    );
}

export default ChainAccounts;
