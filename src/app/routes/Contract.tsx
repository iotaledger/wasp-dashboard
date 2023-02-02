import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { WaspClientService, ContractInfoResponse, ServiceFactory, EventsResponse } from "../../lib";
import "./Route.scss";
import { KeyValueRow, InfoBox, Breadcrumb, Tile, ChainNavbar } from "../components";
/**
 * Contract panel.
 * @returns The node to render.
 */
function Contract() {
    const [contractInfo, setContractInfo] = useState<ContractInfoResponse | null>(null);
    const { contractHName, chainID } = useParams();
    const [contractEvents, setContractEvents] = useState<EventsResponse | null>(null);

    const CHAIN_URL = `/chains/${chainID}`;

    const CONTRACT_BREADCRUMBS = [
        { goTo: "/", text: "Home" },
        { goTo: CHAIN_URL, text: `Chain ${chainID}` },
        { goTo: `${CHAIN_URL}/contract/${contractHName}`, text: `Contract ${contractHName}` },
    ];

    React.useEffect(() => {
        if (!contractHName || !chainID) {
            return;
        }

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getContracts({ chainID })
            .then(contracts => {
                const contract = contracts.find(c => c.hName?.toString() === contractHName);
                if (contract) {
                    setContractInfo(contract);
                }
            });
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .corecontracts()
            .blocklogGetEventsOfContract({ chainID, contractHname: contractHName })
            .then(events => {
                setContractEvents(events);
            });
    }, []);

    return (
        <div className="main">
            <div className="main-wrapper">
                <Breadcrumb breadcrumbs={CONTRACT_BREADCRUMBS} />
                <h2>Contract {contractInfo?.name}</h2>
                <div className="content">
                    <ChainNavbar chainID={chainID} />
                    <InfoBox title="Info">
                        {contractInfo &&
                            Object.entries(contractInfo).map(([key, val]) => (
                                <KeyValueRow key={key} keyText={key} value={val.toString()} />
                            ))}
                    </InfoBox>
                </div>
                <div className="middle row margin-t-m">
                    <h2>Events</h2>
                </div>
                <div className="content">
                    <InfoBox title="Events">
                        {contractEvents?.events?.length === 0 ? (
                            <Tile primaryText="No events found" />
                        ) : (
                            contractEvents?.events?.map(event => <Tile key={event} primaryText={event} />)
                        )}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default Contract;
