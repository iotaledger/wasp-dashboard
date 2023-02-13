/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";
import { AddIcon } from "../../assets";
import { ReactComponent as BannerCurve } from "../../assets/banner-curve.svg";
import {
    ServiceFactory,
    AuthService,
    EventAggregator,
    NodeConfigService,
    PeersService,
    SettingsService,
    BrandHelper,
    PeeringNodeStatusResponse,
    WaspClientService,
    ChainInfoResponse,
    Action,
    PeeringNodeIdentityResponse,
} from "../../lib/";
import { PeersList, InfoBox, Tile, AddPeerDialog, LoadingTile, IconButton } from "../components";
import { usePermissions } from "../hooks";
import "./Home.scss";

/**
 * Home panel.
 * @returns The node to render.
 */
function Home() {
    const [hasWritePermission] = usePermissions();
    const [bannerSrc, setBannerSrc] = useState<undefined | string>();
    const [publicKey, setPublicKey] = useState<undefined | string>();
    const [version, setVersion] = useState<undefined | string>();
    const [networkId, setNetworkId] = useState<undefined | string>();
    const [peersList, setPeersList] = useState<PeeringNodeIdentityResponse[] | null>(null);
    const [chains, setChains] = useState<ChainInfoResponse[] | null>(null);
    const [showAddPeerDialog, setShowAddPeerDialog] = useState<boolean>(false);

    const authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);
    const settingsService = ServiceFactory.get<SettingsService>(SettingsService.ServiceName);
    const nodeConfigService = ServiceFactory.get<NodeConfigService>(NodeConfigService.ServiceName);
    const peersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    useEffect(() => {
        const fetchData = async () => {
            setBannerSrc(await BrandHelper.getBanner(settingsService.getTheme()));
            setPeersList(peersService.get());
            if (authService.isLoggedIn()) {
                try {
                    await nodeConfigService.initialize();
                    setNetworkId(nodeConfigService.getNetworkId());
                    setVersion(nodeConfigService.getVersion());
                    setPublicKey(nodeConfigService.getPublicKey());
                } catch (e) {
                    console.error(e);
                }
            }
        };

        fetchData();

        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .chains()
            .getChains()
            .then(newChains => {
                setChains(newChains);
            })
            .catch(e => {
                console.error(e);
                setChains(null);
            });

        setPeersList(peersService.get());

        if (authService.isLoggedIn()) {
            nodeConfigService
                .initialize()
                .then(() => {
                    setNetworkId(nodeConfigService.getNetworkId());
                    setVersion(nodeConfigService.getVersion());
                    setPublicKey(nodeConfigService.getPublicKey());
                })
                .catch(e => console.error(e));
        }

        EventAggregator.subscribe("theme", "home", async (theme: string) => {
            setBannerSrc(await BrandHelper.getBanner(theme));
        });

        EventAggregator.subscribe("peers-state", "home", async (peers: PeeringNodeStatusResponse[]) => {
            setPeersList(peers);
        });

        return () => {
            EventAggregator.unsubscribe("theme", "home");
            EventAggregator.unsubscribe("peers-state", "home");
        };
    }, []);

    /**
     * Close the AddPeerDialog.
     */
    function closeAddPeerDialog() {
        setShowAddPeerDialog(false);
    }
    return (
        <div className="main">
            <div className="content">
                <div className="card">
                    <div className="banner row">
                        <div className="node-info">
                            <div>
                                <h1>WASP node</h1>
                                <h3 className="secondary">{publicKey}</h3>
                            </div>
                            <p className="secondary">{networkId}</p>
                            <p className="secondary">{version}</p>
                        </div>
                        <div className="banner-image-wrapper">
                            <div className="banner-curve">
                                <BannerCurve />
                            </div>
                            <div className="banner-image">
                                <img src={bannerSrc} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row fill margin-t-s desktop-down-column">
                    <InfoBox title="Chains" titleClassName="title">
                        <div className="sized-container">
                            {chains === null ? (
                                Array.from({ length: 1 }).map((_, i) => (
                                    <LoadingTile key={i} height={20} displayHealth={true} />
                                ))
                            ) : (chains?.length === 0 ? (
                                <Tile primaryText="No chains found" />
                            ) : (
                                chains.map(chain => (
                                    <Tile
                                        key={chain.chainID}
                                        primaryText={chain.chainID}
                                        url={`/chains/${chain.chainID}`}
                                        displayHealth
                                        healthy={chain.isActive}
                                    />
                                ))
                            ))}
                        </div>
                    </InfoBox>
                </div>
                <div className="row fill margin-t-s desktop-down-column">
                    <InfoBox
                        title="Peers"
                        action={
                            <IconButton
                                disabled={!hasWritePermission}
                                icon={<AddIcon />}
                                onClick={() => setShowAddPeerDialog(true)}
                                type={Action.Add}
                            />
                        }
                    >
                        <div className="sized-container">
                            {peersList ? (
                                <PeersList peers={peersList} detailedList />
                            ) : (
                                Array.from({ length: 1 }).map((_, i) => <LoadingTile key={i} displayHealth={true} />)
                            )}
                        </div>
                    </InfoBox>
                    {showAddPeerDialog && <AddPeerDialog onClose={closeAddPeerDialog} onSuccess={closeAddPeerDialog} />}
                </div>
            </div>
        </div>
    );
}

export default Home;
