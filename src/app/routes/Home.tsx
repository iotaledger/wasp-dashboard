/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { ReactNode } from "react";
import { EyeClosedIcon, EyeIcon } from "../../assets";
import { ReactComponent as BannerCurve } from "../../assets/banner-curve.svg";
import { ServiceFactory } from "../../factories/serviceFactory";
import { AuthService } from "../../services/authService";
import { EventAggregator } from "../../services/eventAggregator";
import { NodeConfigService } from "../../services/nodeConfigService";
import { PeersService } from "../../services/peersService";
import { SettingsService } from "../../services/settingsService";
import { ThemeService } from "../../services/themeService";
import { BrandHelper } from "../../utils/brandHelper";
import { PeersList } from "../components";
import AsyncComponent from "../components/layout/AsyncComponent";
import InfoBox from "../components/layout/InfoBox";
import "./Home.scss";
import { HomeState } from "./HomeState";

/**
 * Home panel.
 */
class Home extends AsyncComponent<unknown, HomeState> {
    /**
     * The theme service.
     */
    private readonly _themeService: ThemeService;

    /**
     * The settings service.
     */
    private readonly _settingsService: SettingsService;

    /**
     * The node config service.
     */
    private readonly _nodeConfigService: NodeConfigService;

    /**
     * The auth service.
     */
    private readonly _authService: AuthService;

    /**
     * The peers service.
     */
    private readonly _peersService: PeersService;

    /**
     * Create a new instance of Home.
     * @param props The props.
     */
    constructor(props: unknown) {
        super(props);

        this._authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);
        this._themeService = ServiceFactory.get<ThemeService>(ThemeService.ServiceName);
        this._settingsService = ServiceFactory.get<SettingsService>(SettingsService.ServiceName);
        this._nodeConfigService = ServiceFactory.get<NodeConfigService>(NodeConfigService.ServiceName);
        this._peersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

        this.state = {
            lastReceivedBpsTime: 0,
            bpsIncoming: [],
            bpsOutgoing: [],
            bannerSrc: "",
            blindMode: this._settingsService.getBlindMode(),
            publicKey: "",
            version: "",
            networkId: "",
            peersList: [],
        };
    }

    /**
     * The component mounted.
     */
    public async componentDidMount(): Promise<void> {
        super.componentDidMount();

        this.setState({
            bannerSrc: await BrandHelper.getBanner(this._themeService.get()),
            peersList: this._peersService.get(),
        });

        if (this._authService.isLoggedIn()) {
            this._nodeConfigService
                .initialize()
                .then(() => {
                    this.setState({
                        networkId: this._nodeConfigService.getNetworkId(),
                        version: this._nodeConfigService.getVersion(),
                        publicKey: this._nodeConfigService.getPublicKey(),
                    });
                })
                .catch(e => console.log(e));
        }

        EventAggregator.subscribe("theme", "home", async (theme: string) => {
            this.setState({
                bannerSrc: await BrandHelper.getBanner(theme),
            });
        });

        EventAggregator.subscribe("settings.blindMode", "home", blindMode => {
            this.setState({ blindMode });
        });

        EventAggregator.subscribe("peers-state", "home", peers => {
            this.setState({ peersList: peers });
        });
    }

    /**
     * The component will unmount.
     */
    public componentWillUnmount(): void {
        super.componentWillUnmount();

        EventAggregator.unsubscribe("theme", "home");

        EventAggregator.unsubscribe("settings.blindMode", "home");
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <div className="home">
                <div className="content">
                    <div className="card">
                        <div className="banner row">
                            <div className="node-info">
                                <div>
                                    <h1>WASP node</h1>
                                    <h3 className="secondary">
                                        {this.state.blindMode ? "**********" : this.state.publicKey}
                                    </h3>
                                </div>
                                <p className="secondary">{this.state.networkId}</p>
                                <p className="secondary">{this.state.version}</p>
                            </div>
                            <div className="banner-image-wrapper">
                                <div className="banner-curve">
                                    <BannerCurve />
                                </div>
                                <div className="banner-image">
                                    <img src={this.state.bannerSrc} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row fill margin-t-s desktop-down-column">
                        <InfoBox
                            title="Peers"
                            cardClassName="col peers-summary-col"
                            categoryClassName="peers"
                            titleWithIcon={true}
                            icon={
                                <button
                                    type="button"
                                    onClick={this.handleBlindMode}
                                    className="peers-summary-blind-button"
                                >
                                    {this.state.blindMode ? <EyeIcon /> : <EyeClosedIcon />}
                                </button>
                            }
                        >
                            <PeersList peers={this.state.peersList} blindMode={this.state.blindMode} />
                        </InfoBox>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Check to see if a new version is available.
     * @param currentVersion The current version.
     * @param latestVersion The latest resion.
     */
    private checkVersion(currentVersion: string, latestVersion: string): void {
        if (this.state.version !== currentVersion || this.state.latestVersion !== latestVersion) {
            const comparison = this.compareVersions(currentVersion, latestVersion);

            if (comparison < 0) {
                this.setState({ displayLatestVersion: ` - a new version ${latestVersion} is available.` });
            }
        }
    }

    /**
     * Compare two versions.
     * @param first The first version.
     * @param second The second versions.
     * @returns 0 if the same, 1 if a > b or -1 if a < b.
     */
    private compareVersions(first: string, second: string): number {
        const partsFirst = first.split(".");
        const partsSecond = second.split(".");

        if (partsFirst.length === 3 && partsSecond.length === 3) {
            for (let i = 0; i < 3; i++) {
                const na = Number.parseInt(partsFirst[i], 10);
                const nb = Number.parseInt(partsSecond[i], 10);
                if (na > nb) {
                    return 1;
                }
                if (nb > na) {
                    return -1;
                }

                if (i === 2) {
                    let firstAlphabet = 96;
                    let secondAlphabet = 96;
                    const firstIndex = partsFirst[i].indexOf("-");
                    if (firstIndex > 0) {
                        firstAlphabet = partsFirst[i].codePointAt(firstIndex + 1) ?? Number.NaN;
                    }
                    const secondIndex = partsSecond[i].indexOf("-");
                    if (secondIndex > 0) {
                        secondAlphabet = partsSecond[i].codePointAt(secondIndex + 1) ?? Number.NaN;
                    }

                    return firstAlphabet - secondAlphabet;
                }
            }
        }

        return 0;
    }

    /**
     * Toggle blind mode in peers list.
     */
    private readonly handleBlindMode = (): void => {
        this.setState({ blindMode: !this.state.blindMode });
    };
}

export default Home;
