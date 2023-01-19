/* eslint-disable react/no-multi-comp */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceFactory, WaspClientService, AssetsResponse } from "../../lib";
import "./Account.scss";
import { Breadcrumb, InfoBox, KeyValueRow } from "../components";

/**
 * Account panel.
 * @returns The node to render.
 */
function Account() {
    const [accountBalance, setAccountBalance] = useState<AssetsResponse | null>(null);
    const { chainID, accountID } = useParams();
    const blockBreadcrumbs = [
        { goTo: "/chains", text: "Chains" },
        { goTo: `/chains/${chainID}`, text: `Chain ${chainID}` },
        { goTo: `/chains/${chainID}/accounts/${accountID}`, text: `Account ${accountID}` },
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
            });
    }, [accountID]);

    return (
        <div className="account">
            <div className="account-wrapper">
                <Breadcrumb breadcrumbs={blockBreadcrumbs} />
                <div className="middle row">
                    <h2>Account {accountID}</h2>
                </div>
                <div className="content">
                    <InfoBox title="Info">
                        <KeyValueRow keyText="Base Tokens" value={accountBalance?.baseTokens} />
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default Account;
