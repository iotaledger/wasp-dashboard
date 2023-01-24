import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Route.scss";
import { WaspClientService, ServiceFactory, BlockInfoResponse } from "../../lib";
import { Breadcrumb, InfoBox, KeyValueRow } from "../components";
import Tab from "../components/Tab";
import TabGroup from "../components/TabGroup";

/**
 * ChainBlockExplorer panel.
 * @returns The node to render.
 */
function ChainBlockExplorer() {
    const [chainLatestBlock, setChainLatestBlock] = useState<BlockInfoResponse | null>(null);
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
            .blocklogGetLatestBlockInfo({ chainID })
            .then(newLatestBlock => {
                setChainLatestBlock(newLatestBlock);
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
                        <Tab to={`${chainURL}/blocks`} label="Block explorer" />
                    </TabGroup>
                    <InfoBox title="Latest block">
                        <KeyValueRow
                            keyText="Block index"
                            value={{
                                text: chainLatestBlock?.blockIndex?.toString(),
                                url: `${chainURL}/blocks/${chainLatestBlock?.blockIndex}`,
                            }}
                        />
                        <KeyValueRow keyText="Last updated" value={chainLatestBlock?.timestamp} />
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default ChainBlockExplorer;
