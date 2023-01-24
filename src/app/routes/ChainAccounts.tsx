import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Route.scss";
import { WaspClientService, ServiceFactory } from "../../lib";
import { Breadcrumb, InfoBox, Tile } from "../components";
import Tab from "../components/Tab";
import TabGroup from "../components/TabGroup";

/**
 * ChainAccount panel.
 * @returns The node to render.
 */
function ChainAccounts() {
    const [chainAccounts, setChainAccounts] = useState<string[]>([]);
    const [latestBlock, setLatestBlock] = useState<number>();
    const { chainID } = useParams();
    const chainURL = `/chains/${chainID}`;

    const chainBreadcrumbs = [
        { goTo: "/chains", text: "Chains" },
        { goTo: chainURL, text: `Chain ${chainID}` },
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

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blocklogGetLatestBlockInfo({ chainID })
            .then(newLatestBlock => {
                if (newLatestBlock.blockIndex) {
                    setLatestBlock(newLatestBlock.blockIndex);
                }
            })
            .catch(() => {
                setLatestBlock(0);
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
                    <TabGroup>
                        <Tab to={`${chainURL}`} label="Info" />
                        <Tab to={`${chainURL}/accounts`} label="Accounts" />
                        <Tab to={`${chainURL}/access-nodes`} label="Access nodes" />
                        <Tab to={`${chainURL}/blocks/${latestBlock}`} label="Block explorer" />
                    </TabGroup>
                    <InfoBox title="On-chain accounts">
                        {chainAccounts.map(account => (
                            <Tile key={account} primaryText={account} url={`/chains/${chainID}/accounts/${account}`} />
                        ))}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default ChainAccounts;
