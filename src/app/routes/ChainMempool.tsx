import { Buffer } from "buffer"; // eslint-disable-line unicorn/prefer-node-protocol
import React, { useState } from "react";
import { JsonView, darkStyles, defaultStyles } from "react-json-view-lite";
import { useParams } from "react-router-dom";
import "./Route.scss";
import { Environment } from "../../environment";
import { LocalStorageService, ServiceFactory, SettingsService } from "../../lib";
import { Breadcrumb, InfoBox, ChainNavbar } from "../components";

import "react-json-view-lite/dist/index.css";

/**
 * ChainMempool panel.
 * @returns The node to render.
 */
function ChainMempool() {
    const settingsService = ServiceFactory.get<SettingsService>(SettingsService.ServiceName);

    const [requests, setRequests] = useState<unknown[]>([]);
    const { chainID } = useParams();

    const chainURL = `/chains/${chainID}`;

    const chainBreadcrumbs = [
        { goTo: "/", text: "Home" },
        { goTo: chainURL, text: `Chain ${chainID}` },
        { goTo: `${chainURL}/mempool`, text: "Mempool" },
    ];

    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        loadMempoolContents();

        // EventAggregator.subscribe("peers-state", "chain-accounts", setPeersList);

        // return () => {
        //     EventAggregator.unsubscribe("peers-state", "chain-accounts");
        // };
    }, [chainID]);

    /**
     * Load the committee info
     */
    async function loadMempoolContents() {
        if (!chainID) {
            return;
        }

        // generated client won't work for this, so we need to do it manually:
        const storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
        const binaryResp = await fetch(`${Environment.WaspApiUrl}/v1/chains/${chainID}/mempool`, {
            method: "GET",
            headers: {
                Authorization: storageService.load("dashboard-jwt"),
            },
        }).then(async response => {
            const reader = response.body?.getReader();
            if (reader === undefined) {
                return;
            }
            let resp = new Uint8Array();
            let finishedReading = false;
            while (!finishedReading) {
                await reader
                    .read()
                    .then(({ done, value }) => {
                        if (value !== undefined) {
                            resp = mergeArrays(resp, value);
                        }
                        finishedReading = done;
                    })
                    .catch(err => {
                        console.log(err);
                        finishedReading = true;
                    });
            }
            return resp;
        });

        // In theory this could be parsed as it is being read from the stream,
        // but lets keep it this way for now for simplicity
        if (binaryResp !== undefined) {
            setRequests(parseBinaryResp(binaryResp));
        }
    }

    return (
        <div className="main">
            <div className="main-wrapper">
                <Breadcrumb breadcrumbs={chainBreadcrumbs} />
                <div className="middle row">
                    <h2 className="l1-details-title">Chain {chainID}</h2>
                </div>
                <div className="content">
                    <ChainNavbar chainID={chainID} />
                    <InfoBox title="Contents">
                        <div className="row">
                            This data is available as
                            <pre style={{ padding: "0 8px" }}>window.mempoolRequests</pre>
                            for exploration purposes
                        </div>
                        <JsonView
                            data={requests}
                            // shouldExpandNode={allExpanded}
                            shouldExpandNode={(level, value, field) => level < 2}
                            style={settingsService.getTheme() === "dark" ? darkStyles : defaultStyles}
                        />
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

const mergeArrays = (array1: Uint8Array, array2: Uint8Array): Uint8Array => {
    const mergedArray = new Uint8Array(array1.length + array2.length);
    mergedArray.set(array1);
    mergedArray.set(array2, array1.length);
    return mergedArray;
};

const parseBinaryResp = (data: Uint8Array): unknown[] => {
    const ret = [];
    const buffer = Buffer.from(data);
    let cursor = 0;
    while (cursor < data.length) {
        const len = buffer.readUInt32LE(cursor);
        cursor += 4;
        const objectData = Buffer.from(new Uint8Array(len));
        cursor += buffer.copy(objectData, 0, cursor, cursor + len);
        const objectJsonString = new TextDecoder().decode(objectData);
        ret.push(JSON.parse(objectJsonString));
    }

    // make this object available in the window object (useful for sorting/filering/etc)
    (window as any).mempoolRequests = ret; // eslint-disable-line @typescript-eslint/no-explicit-any
    return ret;
};

export default ChainMempool;
