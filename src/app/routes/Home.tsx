/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";
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
} from "../../lib/";
import { PeersList, InfoBox, Tile } from "../components";
import "./Route.scss";
import "./Home.scss";

/**
 * Home panel.
 * @returns The node to render.
 */
function Home() {
    const [bannerSrc, setBannerSrc] = useState<undefined | string>();
    const [publicKey, setPublicKey] = useState<undefined | string>();
    const [version, setVersion] = useState<undefined | string>();
    const [networkId, setNetworkId] = useState<undefined | string>();
    const [peersList, setPeersList] = useState<PeeringNodeStatusResponse[]>([]);
    const [chains, setChains] = useState<ChainInfoResponse[] | null>(null);

    const authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);
    const settingsService = ServiceFactory.get<SettingsService>(SettingsService.ServiceName);
    const nodeConfigService = ServiceFactory.get<NodeConfigService>(NodeConfigService.ServiceName);
    const peersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    useEffect(() => {
        const fetchData = async () => {
            setBannerSrc(await BrandHelper.getBanner(settingsService.get()));
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

        return () => {
            EventAggregator.unsubscribe("theme", "home");
            EventAggregator.unsubscribe("peers-state", "home");
        };
    }, []);

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
                    <InfoBox title="Peers" titleClassName="title" titleWithIcon={true}>
                        <PeersList peers={peersList} detailedList />
                    </InfoBox>
                </div>
                <div className="row fill margin-t-s desktop-down-column">
                    <InfoBox title="Chains" titleClassName="title">
                        {chains?.map(chain => (
                            <Tile
                                key={chain.chainID}
                                primaryText={chain.chainID}
                                url={`/chains/${chain.chainID}`}
                                displayHealth
                                healthy={chain.isActive}
                            />
                        ))}
                    </InfoBox>
                </div>
            </div>
        </div>
    );
}

export default Home;
