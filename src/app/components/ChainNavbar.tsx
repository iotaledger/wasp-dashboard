import React, { useEffect, useState } from "react";
import { ServiceFactory } from "../../lib";
import { ChainsService } from "../../lib/classes/services/chainsService";
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
    const chainsService = ServiceFactory.get<ChainsService>(ChainsService.ServiceName);

    const [latestBlock, setLatestBLock] = useState(block);

    const CHAIN_URL = `/chains/${chainID}`;

    useEffect(() => {
        if (block !== latestBlock) {
            setLatestBLock(block);
            return;
        }
        if (!chainID) {
            return;
        }

        chainsService
            .getLatestBlock(chainID)
            .then(newLatestBlock => {
                if (newLatestBlock) {
                    setLatestBLock(newLatestBlock.blockIndex);
                }
            })
            .catch(console.error);
    }, [block]);

    return (
        <TabGroup>
            <Tab to={`${CHAIN_URL}`} label="Info" extraMatchingRoutes={[`${CHAIN_URL}/contract`]} exact={true} />
            <Tab to={`${CHAIN_URL}/accounts`} label="Accounts" />
            <Tab to={`${CHAIN_URL}/nodes`} label="Nodes" />
            <Tab to={`${CHAIN_URL}/blocks/${latestBlock}`} label="Block explorer" exact={true} />
        </TabGroup>
    );
}

ChainNavbar.defaultProps = {
    block: undefined,
    chainID: undefined,
};
