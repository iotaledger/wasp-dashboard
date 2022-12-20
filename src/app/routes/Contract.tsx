import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./Contract.scss";
import { ContractInfoResponse } from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";

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
                    <div className="card col fill">
                        <div className="contract-summary">
                            <h4>INFO</h4>
                            {contractInfo &&
                                Object.entries(contractInfo).map(([key, val]) => (
                                    <div key={key} className="card-item">
                                        <span>{key}:</span>
                                        <p className="value">{val.toString()}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contract;
