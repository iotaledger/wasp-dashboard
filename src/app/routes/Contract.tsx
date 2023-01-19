import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { WaspClientService, ContractInfoResponse, ServiceFactory, EventsResponse } from "../../lib";
import "./Contract.scss";
import { KeyValueRow, InfoBox, Breadcrumb, Tile } from "../components";

/**
 * Contract panel.
 * @returns The node to render.
 */
function Contract() {
    const [contractInfo, setContractInfo] = useState<ContractInfoResponse | null>(null);
    const { contractHName, chainID } = useParams();
    const [contractEvents, setContractEvents] = useState<EventsResponse | null>(null);
    const contractBreadcrumbs = [
        { goTo: "/chains", text: "Chains" },
        { goTo: `/chains/${chainID}`, text: `Chain ${chainID}` },
        { goTo: `/chains/${chainID}/contract/${contractHName}`, text: `Contract ${contractHName}` },
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
        <div className="contract">
            <div className="contract-wrapper">
                <Breadcrumb breadcrumbs={contractBreadcrumbs} />
                <h2>Contract {contractInfo?.name}</h2>
                <div className="content">
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
                    <div className="card fill">
                        <div className="summary">
                            {contractEvents?.events?.length === 0 ? (
                                <div>No events found</div>
                            ) : (
                                contractEvents?.events?.map(event => <Tile key={event} primaryText={event} />)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contract;
