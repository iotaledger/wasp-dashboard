import React, { useEffect, useState } from "react";
import { ServiceFactory, WaspClientService } from "../../lib";
import { Tab, TabGroup } from "./index";

interface ChainNavbarProps {
    chainID?: string;
    block?: number;
}

/**
 * A tabs navbar for all Chain routes.
 * @param param0 ChainNavbar props.
 * @param param0.block ChainNavbar's block index.
 * @param param0.chainID ChainNavbar's ChainID.
 * @returns The node to render.
 */
export default function ChainNavbar({ chainID, block }: ChainNavbarProps) {
    const [latestBlock, setLatestBLock] = useState(block);

    const chainURL = `/chains/${chainID}`;

    useEffect(() => {
        if (block || !chainID) {
            return;
        }

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        waspClientService
            .corecontracts()
            .blocklogGetLatestBlockInfo({ chainID })
            .then(newLatestBlock => {
                if (newLatestBlock.blockIndex) {
                    setLatestBLock(newLatestBlock.blockIndex);
                }
            })
            .catch(console.error);
    }, [block]);

    return (
        <TabGroup>
            <Tab to={`${chainURL}`} label="Info" extraMatchingRoutes={[`${chainURL}/contract`]} />
            <Tab to={`${chainURL}/accounts`} label="Accounts" />
            <Tab to={`${chainURL}/access-nodes`} label="Access nodes" />
            <Tab to={`${chainURL}/blocks/${latestBlock}`} label="Block explorer" />
        </TabGroup>
    );
}

ChainNavbar.defaultProps = {
    block: undefined,
    chainID: undefined,
};
