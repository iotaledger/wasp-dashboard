import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Route.scss";
import { EditIcon } from "../../assets";
import {
    WaspClientService,
    ServiceFactory,
    PeeringNodeStatusResponse,
    CommitteeInfoResponse,
    PeersService,
    EventAggregator,
} from "../../lib";
import { Breadcrumb, InfoBox, Tile } from "../components";
import EditAccessNodesDialog from "../components/dialogs/EditAccessNodesDialog";
import Tab from "../components/Tab";
import TabGroup from "../components/TabGroup";

/**
 * ChainAccessNodes panel.
 * @returns The node to render.
 */
function ChainAccessNodes() {
    const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
    const peersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    const [chainCommitteeInfo, setChainCommitteeInfo] = useState<CommitteeInfoResponse | null>(null);
    const [peersList, setPeersList] = useState<PeeringNodeStatusResponse[]>(peersService.get());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { chainID } = useParams();

    const chainURL = `/chains/${chainID}`;
    const accessNodes = chainCommitteeInfo?.accessNodes?.map(({ node }) => node as PeeringNodeStatusResponse) ?? [];

    const chainBreadcrumbs = [
        { goTo: "/chains", text: "Chains" },
        { goTo: chainURL, text: `Chain ${chainID}` },
    ];

    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        loadCommitteeInfo();

        EventAggregator.subscribe("peers-state", "chain-accounts", setPeersList);

        return () => {
            EventAggregator.unsubscribe("peers-state", "chain-accounts");
        };
    }, [chainID]);

    /**
     * When the access nodes are edited.
     * @param newAccessNodes Updated access nodes.
     */
    function onAccessNodesEdited(newAccessNodes: PeeringNodeStatusResponse[]) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        updateAccessNodes(newAccessNodes).then(() => {
            loadCommitteeInfo();
        });
    }

    /**
     * Load the committee info
     */
    function loadCommitteeInfo() {
        if (!chainID) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getCommitteeInfo({ chainID })
            .then(newCommitteeInfo => {
                setChainCommitteeInfo(newCommitteeInfo);
            });
    }

    /**
     * Add and remove the access nodes.
     * @param newAccessNodes Updated access nodes.
     */
    async function updateAccessNodes(newAccessNodes: PeeringNodeStatusResponse[]) {
        if (!chainID) {
            return;
        }

        // Filter what new access nodes were not previously enabled
        const newNodes = newAccessNodes.filter(
            peer => !accessNodes.some(node => node.publicKey === peer.publicKey),
        );
        // Filter what trusted nodes are not access nodes
        const removedNodes = peersList.filter(
            peer => !newAccessNodes.some(node => node.publicKey === peer.publicKey),
        );

        // Add peer nodes as access nodes
        await Promise.all(
            newNodes.map(async ({ publicKey }) => {
                if (!publicKey) {
                    return;
                }
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                waspClientService
                    .chains()
                    .addAccessNode({ chainID, publicKey })
                    .catch(() => {});
            }),
        );

        // Remove peer nodes as access nodes
        await Promise.all(
            removedNodes.map(async ({ publicKey }) => {
                if (!publicKey) {
                    return;
                }

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                waspClientService
                    .chains()
                    .removeAccessNode({ chainID, publicKey })
                    .catch(() => {});
            }),
        );
    }

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
                    </TabGroup>
                    <InfoBox
                        title="Access nodes"
                        titleWithIcon={true}
                        icon={
                            <button type="button" onClick={() => setIsPopupOpen(true)} className="edit-button">
                                <EditIcon />
                            </button>
                        }
                    >
                        {isPopupOpen && (
                            <EditAccessNodesDialog
                                peerNodes={peersList}
                                accessNodes={accessNodes}
                                onSuccess={onAccessNodesEdited}
                                onClose={() => setIsPopupOpen(false)}
                            />
                        )}
                        {accessNodes.length > 0 ? (
                            accessNodes?.map(node => (
                                <Tile
                                    key={node.publicKey}
                                    primaryText={node.publicKey}
                                    healthy={node.isAlive}
                                    displayHealth={true}
                                />
                            ))
                        ) : (
                            <Tile primaryText="No access nodes found." />
                        )}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default ChainAccessNodes;
