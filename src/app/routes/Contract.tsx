import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { WaspClientService, ContractInfoResponse, ServiceFactory } from "../../lib/classes";
import "./Contract.scss";
import KeyValueRow from "../components/KeyValueRow";
import InfoBox from "../components/layout/InfoBox";

/**
 * Contract panel.
 * @returns The node to render.
 */
function Contract() {
    const [contractInfo, setContractInfo] = useState<ContractInfoResponse | null>(null);
    const { contractHName, chainID } = useParams();

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
    }, []);

    return (
        <div className="contract">
            <div className="contract-wrapper">
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
