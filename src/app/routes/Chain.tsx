import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceFactory } from "../../factories/serviceFactory";
import "./Chain.scss";
import { ChainInfoResponse } from "../../services/wasp_client";
import { WaspClientService } from "../../services/waspClientService";

interface ChainInfoValue {
    key: string;
    val: string;
}

/**
 * Transforms a ChainInfoResponse into an array of key-value pairs
 *
 * @param chainInfo Input chain info
 * @returns An array of key-value pairs
 */
function transformInfoIntoArray(chainInfo: ChainInfoResponse): ChainInfoValue[] {
    return Object.entries(chainInfo).flatMap(([key, val]) => {
        if (typeof val === "object") {
            return Object.entries(val as Record<string, string>).map(([k, v]) => ({ key: k, val: v }));
        }
        return { key, val };
    }) as ChainInfoValue[];
}

/**
 * Chain panel.
 * @returns The node to render.
 */
function Chain() {
    const [chainInfo, setChainInfo] = useState<ChainInfoValue[]>([]);
    const { chainID } = useParams();

    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getChainInfo({ chainID })
            .then((newChainInfo) => {
                setChainInfo(transformInfoIntoArray(newChainInfo));
            });
    }, []);

    return (
        <div className="chain">
            <div className="chain-wrapper">
                <h2>Chain {chainID}</h2>
                <div className="content">
                    <div className="card col fill last-card">
                        <div className="chain-summary">
                            <h4>Chain info</h4>
                            {chainInfo.map(({ key, val }) => (
                                <div key={key} className="card-item">
                                    <span>{INFO_NAMES[key]}:</span>
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

const INFO_NAMES: Record<string, string> = {
    chainID: "Chain ID",
    chainOwnerID: "Owner ID",
    eVMChainID: "EVM Chain ID",
    description: "Description",
    gasFeeTokenID: "Gas fee token ID",
    gasPerToken: "Gas per token",
    validatorFeeShare: "Validator fee share",
    isActive: "Active",
    maxBlobSize: "Max blob size",
    maxEventSize: "Max events size",
    maxEventsPerReq: "Max events per req",
};

export default Chain;
