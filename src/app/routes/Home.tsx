import React, { ReactNode } from "react";
import { EyeClosedIcon, EyeIcon } from "../../assets";
import { ReactComponent as BannerCurve } from "../../assets/banner-curve.svg";
import { ReactComponent as DbIcon } from "../../assets/db-icon.svg";
import { ReactComponent as MemoryIcon } from "../../assets/memory.svg";
import { ReactComponent as MilestoneIcon } from "../../assets/milestone.svg";
import { ReactComponent as PruningIcon } from "../../assets/pruning.svg";
import { ReactComponent as UptimeIcon } from "../../assets/uptime.svg";
import { ServiceFactory } from "../../factories/serviceFactory";
import { IBpsMetrics } from "../../models/websocket/IBpsMetrics";
import { IDBSizeMetric } from "../../models/websocket/IDBSizeMetric";
import { INodeStatus } from "../../models/websocket/INodeStatus";
import { IPublicNodeStatus } from "../../models/websocket/IPublicNodeStatus";
import { ISyncStatus } from "../../models/websocket/ISyncStatus";
import { WebSocketTopic } from "../../models/websocket/webSocketTopic";
import { AuthService } from "../../services/authService";
import { EventAggregator } from "../../services/eventAggregator";
import { MetricsService } from "../../services/metricsService";
import { NodeConfigService } from "../../services/nodeConfigService";
import { PeersService } from "../../services/peersService";
import { SettingsService } from "../../services/settingsService";
import { ThemeService } from "../../services/themeService";
import { BrandHelper } from "../../utils/brandHelper";
import { FormatHelper } from "../../utils/formatHelper";
import { PeersList } from "../components";
import AsyncComponent from "../components/layout/AsyncComponent";
import Graph from "../components/layout/Graph";
import InfoPanel from "../components/layout/InfoPanel";
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
     * The metrics service.
     */
    private readonly _metricsService: MetricsService;

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
     * The status subscription id.
     */
    private _nodeStatusSubscription?: string;

    /**
     * The public node status subscription id.
     */
    private _publicNodeStatusSubscription?: string;

    /**
     * The sync status subscription id.
     */
    private _syncStatusSubscription?: string;

    /**
     * The bps metrics subscription id.
     */
    private _bpsMetricsSubscription?: string;

    /**
     * The database size metrics subscription id.
     */
    private _databaseSizeSubscription?: string;

    /**
     * Create a new instance of Home.
     * @param props The props.
     */
    constructor(props: unknown) {
        super(props);

        this._authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);
        this._metricsService = ServiceFactory.get<MetricsService>(MetricsService.ServiceName);
        this._themeService = ServiceFactory.get<ThemeService>(ThemeService.ServiceName);
        this._settingsService = ServiceFactory.get<SettingsService>(SettingsService.ServiceName);
        this._nodeConfigService = ServiceFactory.get<NodeConfigService>(NodeConfigService.ServiceName);
        this._peersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

        this.state = {
            lmi: "-",
            cmi: "-",
            pruningIndex: "-",
            memory: "-",
            dbLedgerSizeFormatted: "-",
            dbTangleSizeFormatted: "-",
            uptime: "-",
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
                .catch((e) => console.log(e));
        }

        EventAggregator.subscribe("theme", "home", async (theme: string) => {
            this.setState({
                bannerSrc: await BrandHelper.getBanner(theme),
            });
        });

        this._publicNodeStatusSubscription = this._metricsService.subscribe<IPublicNodeStatus>(
            WebSocketTopic.PublicNodeStatus,
            (data) => {
                if (data) {
                    const pruningIndex = data.pruningIndex.toString();

                    if (pruningIndex !== this.state.pruningIndex) {
                        this.setState({ pruningIndex });
                    }
                }
            }
        );

        this._nodeStatusSubscription = this._metricsService.subscribe<INodeStatus>(
            WebSocketTopic.NodeStatus,
            (data) => {
                if (data) {
                    const uptime = FormatHelper.duration(data.uptime);
                    const memory = FormatHelper.iSize(data.memUsage);

                    if (uptime !== this.state.uptime) {
                        this.setState({ uptime });
                    }

                    if (memory !== this.state.memory) {
                        this.setState({ memory });
                    }

                    this.checkVersion(data.version, data.latestVersion);
                }
            }
        );

        this._syncStatusSubscription = this._metricsService.subscribe<ISyncStatus>(
            WebSocketTopic.SyncStatus,
            (data) => {
                if (data) {
                    const lmi = data.lmi ? data.lmi.toString() : "";
                    const cmi = data.cmi ? data.cmi.toString() : "";

                    if (lmi !== this.state.lmi) {
                        this.setState({ lmi });
                    }

                    if (cmi !== this.state.cmi) {
                        this.setState({ cmi });
                    }
                }
            }
        );

        this._bpsMetricsSubscription = this._metricsService.subscribe<IBpsMetrics>(
            WebSocketTopic.BPSMetrics,
            undefined,
            (allData) => {
                const nonNull = allData.filter((d) => d !== undefined && d !== null);

                const bpsIncoming = nonNull.map((m) => m.incoming);
                const bpsOutgoing = nonNull.map((m) => m.outgoing);

                this.setState({ bpsIncoming, bpsOutgoing, lastReceivedBpsTime: Date.now() });
            }
        );

        this._databaseSizeSubscription = this._metricsService.subscribe<IDBSizeMetric>(
            WebSocketTopic.DBSizeMetric,
            (data) => {
                if (data) {
                    const dbLedgerSizeFormatted = FormatHelper.size(data.utxo);

                    if (dbLedgerSizeFormatted !== this.state.dbLedgerSizeFormatted) {
                        this.setState({ dbLedgerSizeFormatted });
                    }

                    const dbTangleSizeFormatted = FormatHelper.size(data.tangle);

                    if (dbTangleSizeFormatted !== this.state.dbTangleSizeFormatted) {
                        this.setState({ dbTangleSizeFormatted });
                    }
                }
            }
        );

        EventAggregator.subscribe("settings.blindMode", "home", (blindMode) => {
            this.setState({ blindMode });
        });

        EventAggregator.subscribe("peers-state", "home", (peers) => {
            this.setState({ peersList: peers });
        });
    }

    /**
     * The component will unmount.
     */
    public componentWillUnmount(): void {
        super.componentWillUnmount();

        EventAggregator.unsubscribe("theme", "home");

        if (this._nodeStatusSubscription) {
            this._metricsService.unsubscribe(this._nodeStatusSubscription);
            this._nodeStatusSubscription = undefined;
        }

        if (this._publicNodeStatusSubscription) {
            this._metricsService.unsubscribe(this._publicNodeStatusSubscription);
            this._publicNodeStatusSubscription = undefined;
        }

        if (this._syncStatusSubscription) {
            this._metricsService.unsubscribe(this._syncStatusSubscription);
            this._syncStatusSubscription = undefined;
        }

        if (this._bpsMetricsSubscription) {
            this._metricsService.unsubscribe(this._bpsMetricsSubscription);
            this._bpsMetricsSubscription = undefined;
        }

        if (this._databaseSizeSubscription) {
            this._metricsService.unsubscribe(this._databaseSizeSubscription);
            this._databaseSizeSubscription = undefined;
        }

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
                                    <h3>{this.state.blindMode ? "**********" : this.state.publicKey}</h3>
                                </div>
                                <p className="secondary">{this.state.networkId}</p>
                                <p className="secondary">{this.state.version}</p>
                            </div>
                            <BannerCurve className="banner-curve" />
                            <div className="banner-image">
                                <img src={this.state.bannerSrc} />
                            </div>
                        </div>
                    </div>
                    <div className="row fill margin-t-s desktop-down-column">
                        <div className="col info-col fill">
                            <div className="row tablet-down-column">
                                <InfoPanel
                                    caption="CMI / LMI"
                                    value={`${this.state.cmi} / ${this.state.lmi}`}
                                    icon={<MilestoneIcon />}
                                    backgroundStyle="green"
                                />
                                <InfoPanel
                                    caption="Pruning Index"
                                    value={this.state.pruningIndex?.toString()}
                                    icon={<PruningIcon />}
                                    backgroundStyle="orange"
                                />
                            </div>
                            <div className="row margin-t-s tablet-down-column">
                                <InfoPanel
                                    caption="Uptime"
                                    value={this.state.uptime}
                                    icon={<UptimeIcon />}
                                    backgroundStyle="blue"
                                />
                                <InfoPanel
                                    caption="Memory Usage"
                                    value={this.state.memory}
                                    icon={<MemoryIcon />}
                                    backgroundStyle="purple"
                                />
                            </div>
                            <div className="row margin-t-s tablet-down-column">
                                <InfoPanel
                                    caption="Ledger DB"
                                    value={this.state.dbLedgerSizeFormatted}
                                    icon={<DbIcon />}
                                    backgroundStyle="green"
                                />
                                <InfoPanel
                                    caption="Tangle DB"
                                    value={this.state.dbTangleSizeFormatted}
                                    icon={<DbIcon />}
                                    backgroundStyle="green"
                                />
                            </div>
                            <div className="row margin-t-s">
                                <div className="card fill blocks-graph-panel">
                                    <Graph
                                        caption="Blocks Per Second"
                                        seriesMaxLength={20}
                                        timeInterval={1000}
                                        endTime={this.state.lastReceivedBpsTime}
                                        series={[
                                            {
                                                className: "bar-color-1",
                                                label: "Incoming",
                                                values: this.state.bpsIncoming,
                                            },
                                            {
                                                className: "bar-color-2",
                                                label: "Outgoing",
                                                values: this.state.bpsOutgoing,
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card col peers-summary-col peers-summary-panel">
                            <div className="peers-summary">
                                <div className="row middle spread margin-b-m">
                                    <h4>Peers</h4>
                                    <button
                                        type="button"
                                        onClick={this.handleBlindMode}
                                        className="peers-summary--icon-button"
                                    >
                                        {this.state.blindMode ? <EyeIcon /> : <EyeClosedIcon />}
                                    </button>
                                </div>
                                {!this.state.peersList?.length ? (
                                    <p>There are no peers.</p>
                                ) : (
                                    <PeersList peers={this.state.peersList} blindMode={this.state.blindMode} />
                                )}
                            </div>
                        </div>
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
