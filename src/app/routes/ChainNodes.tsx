import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Route.scss";
import { EditIcon } from "../../assets";
import {
    WaspClientService,
    ServiceFactory,
    CommitteeInfoResponse,
    PeersService,
    EventAggregator,
    Action,
} from "../../lib";
import { PeeringNode } from "../../lib/classes/services/peersService";
import {
    Breadcrumb,
    InfoBox,
    KeyValueRow,
    PeersList,
    ChainNavbar,
    EditAccessNodesDialog,
    LoadingTile,
    Tile,
    IconButton,
    LoadingInfo,
} from "../components";
import { usePermissions } from "../hooks";

const getStatus = (status: boolean) => (status ? "UP" : "DOWN");

/**
 * ChainNodes panel.
 * @returns The node to render.
 */
function ChainNodes() {
    const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
    const peersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    const [hasWritePermission] = usePermissions();
    const [chainCommitteeInfo, setChainCommitteeInfo] = useState<CommitteeInfoResponse | null>(null);
    const [peersList, setPeersList] = useState<PeeringNode[]>(peersService.get());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { chainID } = useParams();

    const chainURL = `/chains/${chainID}`;
    const accessNodes = chainCommitteeInfo?.accessNodes?.map(({ node }) => node as PeeringNode);
    const peersNodes = chainCommitteeInfo?.committeeNodes?.map(({ node }) => node as PeeringNode);

    const chainBreadcrumbs = [
        { goTo: "/", text: "Home" },
        { goTo: chainURL, text: `Chain ${chainID}` },
        { goTo: `${chainURL}/nodes`, text: "Nodes" },
    ];

    React.useEffect(() => {
        if (!chainID) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        loadCommitteeInfo();

        EventAggregator.subscribe("peers-state", "chain-accounts", setPeersList);

        return () => {
            EventAggregator.unsubscribe("peers-state", "chain-accounts");
        };
    }, [chainID]);

    /**
     * Load the committee info
     */
    async function loadCommitteeInfo() {
        if (!chainID) {
            return;
        }

        await waspClientService
            .chains()
            .getCommitteeInfo(chainID)
            .then(newCommitteeInfo => {
                setChainCommitteeInfo(newCommitteeInfo);
            })
            .catch(() => {
                setChainCommitteeInfo(null);
            });
    }

    /**
     * When the user has edited the access nodes
     */
    function onEditSuccess() {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        loadCommitteeInfo().then(() => {
            setIsPopupOpen(false);
        });
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
                    <InfoBox title="Committee">
                        {chainCommitteeInfo === null ? (
                            <LoadingInfo />
                        ) : (chainCommitteeInfo ? (
                            <React.Fragment>
                                <KeyValueRow keyText="Address" value={chainCommitteeInfo.stateAddress} />
                                <KeyValueRow keyText="Status" value={getStatus(chainCommitteeInfo.active ?? false)} />
                            </React.Fragment>
                        ) : (
                            <Tile primaryText="No committee found." />
                        ))}
                    </InfoBox>
                    <InfoBox
                        title="Access nodes"
                        action={
                            <IconButton
                                disabled={!hasWritePermission}
                                onClick={() => setIsPopupOpen(true)}
                                icon={<EditIcon />}
                                type={Action.Edit}
                            />
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
                        {isPopupOpen && accessNodes && chainID && (
                            <EditAccessNodesDialog
                                peerNodes={peersList}
                                accessNodes={accessNodes}
                                onSuccess={onEditSuccess}
                                chainID={chainID}
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
