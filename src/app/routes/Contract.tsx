import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { WaspClientService, ContractInfoResponse, ServiceFactory } from "../../lib/classes";
import "./Contract.scss";
import { KeyValueRow, InfoBox, Breadcrumb } from "../components";

/**
 * Contract panel.
 * @returns The node to render.
 */
function Contract() {
    const [contractInfo, setContractInfo] = useState<ContractInfoResponse | null>(null);
    const { contractHName, chainID } = useParams();
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
                console.log(events);
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
            </div>
        </div>
    );
}

export default Contract;
