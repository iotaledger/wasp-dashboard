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
import {
    Breadcrumb,
    InfoBox,
    KeyValueRow,
    PeersList,
    LoadingChainCommitteeBox,
    ChainNavbar,
    EditAccessNodesDialog,
    LoadingTile,
} from "../components";

const getStatus = (status: boolean) => (status ? "UP" : "DOWN");

/**
 * ChainNodes panel.
 * @returns The node to render.
 */
function ChainNodes() {
    const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
    const peersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    const [chainCommitteeInfo, setChainCommitteeInfo] = useState<CommitteeInfoResponse | null>(null);
    const [peersList, setPeersList] = useState<PeeringNodeStatusResponse[]>(peersService.get());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { chainID } = useParams();

    const chainURL = `/chains/${chainID}`;
    const accessNodes = chainCommitteeInfo?.accessNodes?.map(({ node }) => node as PeeringNodeStatusResponse);
    const peersNodes = chainCommitteeInfo?.committeeNodes?.map(({ node }) => node as PeeringNodeStatusResponse);

    const chainBreadcrumbs = [
        { goTo: "/", text: "Home" },
        { goTo: chainURL, text: `Chain ${chainID}` },
        { goTo: `${chainURL}/nodes`, text: "Nodes" },
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
        if (!chainID || !accessNodes) {
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
                    <ChainNavbar chainID={chainID} />
                    {chainCommitteeInfo ? (
                        <InfoBox title="Committee">
                            <KeyValueRow keyText="Address" value={chainCommitteeInfo.stateAddress} />
                            <KeyValueRow keyText="Status" value={getStatus(chainCommitteeInfo.active ?? false)} />
                        </InfoBox>
                    ) : (
                        <LoadingChainCommitteeBox />
                    )}
                    <InfoBox
                        title="Access nodes"
                        titleWithIcon={true}
                        icon={
                            <button type="button" onClick={() => setIsPopupOpen(true)} className="edit-button">
                                <EditIcon />
                            </button>
                        }
                    >
                        <div className="sized-container">
                            {accessNodes ? (
                                <PeersList
                                    peers={accessNodes}
                                    detailedList
                                    enableDelete={false}
                                    emptyText="No access nodes found."
                                />
                            ) : (
                                Array.from({ length: 2 }).map((_, i) => <LoadingTile key={i} displayHealth={true} />)
                            )}
                        </div>
                        {isPopupOpen && accessNodes && (
                            <EditAccessNodesDialog
                                peerNodes={peersList}
                                accessNodes={accessNodes}
                                onSuccess={onAccessNodesEdited}
                                onClose={() => setIsPopupOpen(false)}
                            />
                        )}
                    </InfoBox>
                    <InfoBox title="Peers">
                        <div className="sized-container">
                            {peersNodes ? (
                                <PeersList peers={peersNodes} detailedList enableDelete={false} />
                            ) : (
                                Array.from({ length: 2 }).map((_, i) => <LoadingTile key={i} displayHealth={true} />)
                            )}
                        </div>
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default ChainNodes;
