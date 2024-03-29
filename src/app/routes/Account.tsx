import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceFactory, WaspClientService, AssetsResponse } from "../../lib";
import "./Route.scss";
import { Breadcrumb, ChainNavbar, InfoBox, KeyValueRow } from "../components";

/**
 * Account panel.
 * @returns The node to render.
 */
function Account() {
    const [accountBalance, setAccountBalance] = useState<AssetsResponse | null>(null);
    const { chainID, accountID } = useParams();

    const chainURL = `/chains/${chainID}`;
    const blockBreadcrumbs = [
        { goTo: "/", text: "Home" },
        { goTo: chainURL, text: `Chain ${chainID}` },
        { goTo: `${chainURL}/accounts/1`, text: "Accounts" },
        { goTo: `${chainURL}/account/${accountID}`, text: `Account ${accountID}` },
    ];

    React.useEffect(() => {
        if (!accountID || !chainID) {
            return;
        }

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .accountsGetAccountBalance({ chainID, agentID: accountID })
            .then(newBlockInfo => {
                setAccountBalance(newBlockInfo);
            })
            .catch(e => {
                setAccountBalance(null);
                console.error(e);
            });
    }, [accountID]);

    return (
        <div className="main">
            <div className="main-wrapper">
                <Breadcrumb breadcrumbs={blockBreadcrumbs} />
                <div className="middle row">
                    <h2>Account {accountID}</h2>
                </div>
                <div className="content">
                    <ChainNavbar chainID={chainID} />
                    <InfoBox title="Info">
                        <KeyValueRow keyText="Base Tokens" value={accountBalance?.baseTokens} />
                    </InfoBox>
                    {accountBalance?.nativeTokens?.map(token => (
                        <InfoBox key={token.id} title={`Native Token #${token.id}`}>
                            {Object.entries(token).map(([key, value]) => (
                                <KeyValueRow key={key} keyText={key} value={value} />
                            ))}
                        </InfoBox>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Account;
