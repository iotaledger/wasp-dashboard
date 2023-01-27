import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import "./Route.scss";
import { ServiceFactory, WaspClientService } from "../../lib";
import { Breadcrumb, InfoBox, Tile } from "../components";
import ChainNavbar from "../components/ChainNavbar";

const SEARCH_ACCOUNT_PLACEHOLDER = "Account address";

/**
 * ChainAccount panel.
 * @returns The node to render.
 */
function ChainAccounts() {
    const [chainAccounts, setChainAccounts] = useState<string[]>([]);
    const { chainID } = useParams();
    const [search, setSearch] = useState("");

    const results = search ? chainAccounts.filter(acc => acc.match(search)) : chainAccounts;
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

    // eslint-disable-next-line jsdoc/require-param-description
    /**
     *
     * @param e
     */
    function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    return (
        <div className="main">
            <div className="main-wrapper">
                <Breadcrumb breadcrumbs={chainBreadcrumbs} />
                <div className="middle row">
                    <h2 className="l1-details-title">Chain {chainID}</h2>
                </div>
                <div className="content">
                    <ChainNavbar chainID={chainID} />

                    <InfoBox
                        title="On-chain accounts"
                        cornerNode={
                            <input
                                onChange={onSearchChange}
                                value={search}
                                placeholder={SEARCH_ACCOUNT_PLACEHOLDER}
                                disabled={chainAccounts.length === 0}
                            />
                        }
                    >
                        {search.length > 0 && <h1 className="margin-b-m">{results.length} results found.</h1>}
                        {results.map(account => (
                            <Tile key={account} primaryText={account} url={`/chains/${chainID}/accounts/${account}`} />
                        ))}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default ChainAccounts;
