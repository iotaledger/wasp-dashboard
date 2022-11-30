import moment from "moment";
import React, { ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ReactComponent as ChainsIcon } from "../assets/chains.svg";
import { ReactComponent as ConfigurationIcon } from "../assets/configuration.svg";
import { ReactComponent as ExplorerIcon } from "../assets/explorer.svg";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as L1Icon } from "../assets/l1.svg";
import { ReactComponent as MoonIcon } from "../assets/moon.svg";
import { ReactComponent as PadlockUnlockedIcon } from "../assets/padlock-unlocked.svg";
import { ReactComponent as PadlockIcon } from "../assets/padlock.svg";
import { ReactComponent as PeersIcon } from "../assets/peers.svg";
import { ReactComponent as PluginsIcon } from "../assets/plugins.svg";
import { ReactComponent as SunIcon } from "../assets/sun.svg";
import { ReactComponent as UsersIcon } from "../assets/users.svg";
import { ReactComponent as VisualizerIcon } from "../assets/visualizer.svg";
import { ServiceFactory } from "../factories/serviceFactory";
import { INodeStatus } from "../models/websocket/INodeStatus";
import { IPublicNodeStatus } from "../models/websocket/IPublicNodeStatus";
import { ISyncStatus } from "../models/websocket/ISyncStatus";
import { WebSocketTopic } from "../models/websocket/webSocketTopic";
import { AuthService } from "../services/authService";
import { EventAggregator } from "../services/eventAggregator";
import { LocalStorageService } from "../services/localStorageService";
import { MetricsService } from "../services/metricsService";
import { ThemeService } from "../services/themeService";
import { WaspClientService } from "../services/waspClientService";
import { BrandHelper } from "../utils/brandHelper";
import "./App.scss";
import { AppState } from "./AppState";
import AsyncComponent from "./components/layout/AsyncComponent";
import Breakpoint from "./components/layout/Breakpoint";
import Header from "./components/layout/Header";
import HealthIndicator from "./components/layout/HealthIndicator";
import NavMenu from "./components/layout/NavMenu";
import NavPanel from "./components/layout/NavPanel";
import RoutesSwitcher from "./routes/RoutesSwitcher";


/**
 * Main application class.
 */
class App extends AsyncComponent<RouteComponentProps, AppState> {
    /**
     * The theme service.
     */
    private readonly _themeService: ThemeService;

    /**
     * The auth service.
     */
    private readonly _authService: AuthService;

    /**
     * The wasp client service.
     */
    private readonly _waspClientService: WaspClientService;

    /**
     * The storage service.
     */
    private readonly _storageService: LocalStorageService;

    /**
     * The metrics service.
     */
    private readonly _metricsService: MetricsService;

    /**
     * The public node status subscription id.
     */
    private _publicNodeStatusSubscription?: string;

    /**
     * The status subscription id.
     */
    private _statusSubscription?: string;

    /**
     * The sync status metrics subscription id.
     */
    private _syncStatusSubscription?: string;

    /**
     * The node alias.
     */
    private _alias?: string;

    /**
     * The lastest milestone index.
     */
    private _lmi?: string;

    /**
     * The confirmed milestone index.
     */
    private _cmi?: string;

    /**
     * The time of the last status update.
     */
    private _lastStatus: number;

    /**
     * The status timer.
     */
    private _statusTimer?: NodeJS.Timer;

    /**
     * The token expiry timer.
     */
    private _tokenExpiryTimer?: NodeJS.Timer;

    /**
     * Create a new instance of App.
     * @param props The props.
     */
    constructor(props: RouteComponentProps) {
        super(props);
        this._themeService = ServiceFactory.get<ThemeService>("theme");
        this._authService = ServiceFactory.get<AuthService>("auth");
        this._metricsService = ServiceFactory.get<MetricsService>("metrics");
        this._storageService = ServiceFactory.get<LocalStorageService>("local-storage");
        this._waspClientService = ServiceFactory.get<WaspClientService>("wasp-client");
        this._lastStatus = 0;

        this.state = {
            isLoggedIn: true, // For now, routes are unprotected.
            // isLoggedIn: Boolean(this._authService.isLoggedIn()),
            theme: this._themeService.get(),
            online: false,
            syncHealth: false,
            nodeHealth: false
        };

        this.updateTitle();
    }

    /**
     * The component mounted.
     */
    public async componentDidMount(): Promise<void> {
        super.componentDidMount();

        try {
            await this._waspClientService.node().getInfo();

            this.setState({
                online: true
            });
        } catch (ex) {
            console.log(ex)
            // Raise exception message to frontend
        }

        /*
        EventAggregator.subscribe("auth-state", "app", isLoggedIn => {
            this.setState({
                isLoggedIn
            }, () => {
                if (this.state.isLoggedIn) {
                    this.validateTokenPeriodically();
                }
            });
        });*/

        EventAggregator.subscribe("theme", "app", theme => {
            this.setState({ theme });
        });

        /*
        this._statusSubscription = this._metricsService.subscribe<INodeStatus>(
            WebSocketTopic.NodeStatus,
            data => {
                if (data && data.nodeAlias !== this._alias) {
                    this._alias = data.nodeAlias;
                    this.updateTitle();
                }
            });

        this._syncStatusSubscription = this._metricsService.subscribe<ISyncStatus>(
            WebSocketTopic.SyncStatus,
            data => {
                if (data) {
                    const lmi = data.lmi ? data.lmi.toString() : "";
                    const smi = data.cmi ? data.cmi.toString() : "";

                    if (lmi !== this._lmi || smi !== this._cmi) {
                        this._cmi = smi;
                        this._lmi = lmi;
                        this.updateTitle();
                    }
                }
            });

        this._publicNodeStatusSubscription = this._metricsService.subscribe<IPublicNodeStatus>(
            WebSocketTopic.PublicNodeStatus,
            data => {
                if (data) {
                    this._lastStatus = Date.now();
                    if (!this.state.online) {
                        EventAggregator.publish("online", true);
                        this.setState({
                            online: true
                        });
                    }
                    if (data.isHealthy !== this.state.nodeHealth) {
                        this.setState({ nodeHealth: data.isHealthy });
                    }
                    if (data.isSynced !== this.state.syncHealth) {
                        this.setState({ syncHealth: data.isSynced });
                    }
                }
            });*/

            /*
        this._statusTimer = setInterval(() => {
            if (Date.now() - this._lastStatus > 30000 && this.state.online) {
                this.setState({
                    online: false
                });

                EventAggregator.publish("online", false);
            }
        }, 1000);*/
    }

    /**
     * The component will unmount.
     */
    public componentWillUnmount(): void {
        super.componentWillUnmount();

        EventAggregator.unsubscribe("auth-state", "app");
        EventAggregator.unsubscribe("theme", "app");

        if (this._statusSubscription) {
            this._metricsService.unsubscribe(this._statusSubscription);
            this._statusSubscription = undefined;
        }

        if (this._syncStatusSubscription) {
            this._metricsService.unsubscribe(this._syncStatusSubscription);
            this._syncStatusSubscription = undefined;
        }

        if (this._publicNodeStatusSubscription) {
            this._metricsService.unsubscribe(this._publicNodeStatusSubscription);
            this._publicNodeStatusSubscription = undefined;
        }

        if (this._statusTimer !== undefined) {
            clearInterval(this._statusTimer);
            this._statusTimer = undefined;
        }

        this.clearTokenExpiryInterval();
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        const sections = [
            {
                label: "Home",
                icon: <HomeIcon />,
                route: "/",
                hidden: !this.state.isLoggedIn
            },
            {
                label: "Peers",
                icon: <PeersIcon />,
                route: "/peers",
                hidden: !this.state.isLoggedIn
            },
            {
                label: "Chains",
                icon: <ChainsIcon />,
                route: "/chains",
                hidden: !this.state.isLoggedIn
            },
            {
                label: "Configuration",
                icon: <ConfigurationIcon />,
                route: "/configuration",
                hidden: !this.state.isLoggedIn
            },
            {
                label: "L1",
                icon: <L1Icon />,
                route: "/l1",
                hidden: !this.state.isLoggedIn
            },
            {
                label: "Users",
                icon: <UsersIcon />,
                route: "/users",
                hidden: !this.state.isLoggedIn
            },
            {
                label: "Login",
                icon: <PadlockIcon />,
                route: "/login",
                hidden: this.state.isLoggedIn
            },
            {
                label: "Logout",
                icon: <PadlockUnlockedIcon />,
                function: () => this._authService.logout(),
                hidden: !this.state.isLoggedIn
            }
        ];

        const endSections = [
            {
                label: "Light",
                icon: <SunIcon />,
                function: () => this._themeService.apply("light", true),
                hidden: this.state.theme === "light"
            },
            {
                label: "Dark",
                icon: <MoonIcon />,
                function: () => this._themeService.apply("dark", true),
                hidden: this.state.theme === "dark"
            }
        ];

        return (
            <div className="app">
                <Breakpoint size="phone" aboveBelow="above">
                    <NavPanel
                        fullWidth={false}
                        middle={this.state.online ? sections : []}
                        end={this.state.online ? endSections : []}
                    />
                </Breakpoint>
                <div className="col fill">
                    <Header>
                        <Breakpoint size="phone" aboveBelow="below">
                            <NavMenu>
                                <NavPanel
                                    fullWidth={true}
                                    middle={this.state.online ? sections : []}
                                    end={this.state.online ? endSections : []}
                                />
                            </NavMenu>
                        </Breakpoint>
                    </Header>
                    <div className="fill scroll-content">
                        {!this.state.online && (
                            <p className="padding-l">The node is offline or loading.</p>
                        )}
                        {this.state.online && (
                            <React.Fragment>
                                <Breakpoint size="tablet" aboveBelow="below">
                                    <div className="card card__flat row middle health-indicators">
                                        <HealthIndicator
                                            label="Health"
                                            healthy={this.state.nodeHealth}
                                            className="child margin-r-l"
                                        />
                                        <HealthIndicator
                                            label="Sync"
                                            healthy={this.state.syncHealth}
                                            className="child"
                                        />
                                    </div>
                                </Breakpoint>
                                <RoutesSwitcher isLoggedIn={this.state.isLoggedIn} />
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Update the window title.
     */
    private updateTitle(): void {
        let title = BrandHelper.getConfiguration().name;

        if (this._alias) {
            title += ` (${this._alias})`;
        }
        if (this._lmi && this._cmi) {
            title += ` ${this._cmi} / ${this._lmi}`;
        }

        document.title = title;
    }

    /**
     * Refresh the token one minute before it expires.
     */
    private validateTokenPeriodically() {
        this.clearTokenExpiryInterval();
        const jwt = this._storageService.load<string>("dashboard-jwt");
        const expiryTimestamp = this.getTokenExpiry(jwt);
        const expiryDate = moment(expiryTimestamp);
        const refreshTokenDate = moment(expiryDate).subtract(1, "minutes");

        this._tokenExpiryTimer = setInterval(async () => {
            const now = moment();
            if (now.isAfter(expiryDate)) {
                this._authService.logout();
                this.clearTokenExpiryInterval();
            } else if (now.isBetween(refreshTokenDate, expiryDate)) {
                await this._authService.initialize();
            }
        }, 5000);
    }

    /**
     * Decode jwt to get expiry time.
     * @param token The jwt.
     * @returns The expiry time.
     */
    private getTokenExpiry(token: string) {
        const payload = token.split(".")[1];
        const decodedToken = window.atob(payload);
        const parsedToken = JSON.parse(decodedToken);
        const expiryTimestamp = parsedToken.exp * 1000;

        return expiryTimestamp;
    }

    /**
     * Clear token expiry interval.
     */
    private clearTokenExpiryInterval() {
        if (this._tokenExpiryTimer !== undefined) {
            clearInterval(this._tokenExpiryTimer);
            this._tokenExpiryTimer = undefined;
        }
    }
}

export default withRouter(App);
