import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import "./Route.scss";
import { WaspClientService, ServiceFactory } from "../../lib";
import { Breadcrumb, InfoBox, Tile, LoadingTile, ChainNavbar } from "../components";

const SEARCH_ACCOUNT_PLACEHOLDER = "Account address";

/**
 * ChainAccount panel.
 * @returns The node to render.
 */
function ChainAccounts() {
    const [chainAccounts, setChainAccounts] = useState<string[] | null>(null);
    const [search, setSearch] = useState<string>("");
    const { chainID } = useParams();
    const results = search ? chainAccounts?.filter(acc => acc.match(search)) : chainAccounts;
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
            })
            .catch(() => {
                setChainAccounts(null);
            });
    }, []);

    // eslint-disable-next-line jsdoc/require-jsdoc
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
                    {chainAccounts === null ? (
                        <InfoBox title="On-chain accounts">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <LoadingTile key={i} />
                            ))}
                        </InfoBox>
                    ) : (
                        <InfoBox
                            title="On-chain accounts"
                            action={
                                <input
                                    onChange={onSearchChange}
                                    value={search}
                                    placeholder={SEARCH_ACCOUNT_PLACEHOLDER}
                                    disabled={chainAccounts.length === 0}
                                />
                            }
                        >
                            {search.length > 0 && <h4 className="margin-b-m">{results?.length} results found.</h4>}
                            {chainAccounts.length > 0 ? (
                                results?.map(account => (
                                    <Tile
                                        key={account}
                                        primaryText={account}
                                        url={`/chains/${chainID}/accounts/${account}`}
                                    />
                                ))
                            ) : (
                                <Tile primaryText="No accounts found." />
                            )}
                        </InfoBox>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChainAccounts;
