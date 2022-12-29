import "./App.scss";

import moment from "moment";
import React, { Component, ReactNode } from "react";
import { ReactComponent as ChainsIcon } from "../assets/chains.svg";
import { ReactComponent as ConfigurationIcon } from "../assets/configuration.svg";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as L1Icon } from "../assets/l1.svg";
import { ReactComponent as MoonIcon } from "../assets/moon.svg";
import { ReactComponent as PadlockUnlockedIcon } from "../assets/padlock-unlocked.svg";
import { ReactComponent as PadlockIcon } from "../assets/padlock.svg";
import { ReactComponent as PeersIcon } from "../assets/peers.svg";
import { ReactComponent as SunIcon } from "../assets/sun.svg";
import { ReactComponent as UsersIcon } from "../assets/users.svg";
import {
    ServiceFactory,
    AuthService,
    EventAggregator,
    LocalStorageService,
    MetricsService,
    ThemeService,
    WaspClientService,
} from "../lib/classes";
import { BrandHelper } from "../utils/brandHelper";
import { decodeJWTPayload } from "../utils/jwt";
import isNodeOnline from "../utils/nodeStatus";
import { AppState } from "./AppState";
import Breakpoint from "./components/layout/Breakpoint";
import NavPanel from "./components/layout/NavPanel";
import RoutesSwitcher from "./routes/RoutesSwitcher";

/**
 * Main application class.
 */
class App extends Component<object, AppState> {
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
    private readonly _alias?: string;

    /**
     * The lastest milestone index.
     */
    private readonly _lmi?: string;

    /**
     * The confirmed milestone index.
     */
    private readonly _cmi?: string;

    /**
     * The time of the last status update.
     */
    private readonly _lastStatus: number;

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
    constructor(props: object) {
        super(props);
        this._themeService = ServiceFactory.get<ThemeService>(ThemeService.ServiceName);
        this._authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);
        this._metricsService = ServiceFactory.get<MetricsService>(MetricsService.ServiceName);
        this._storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
        this._waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
        this._lastStatus = 0;

        this.state = {
            isLoggedIn: Boolean(this._authService.isLoggedIn()),
            theme: this._themeService.get(),
            online: false,
            // eslint-disable-next-line react/no-unused-state
            syncHealth: false,
            // eslint-disable-next-line react/no-unused-state
            nodeHealth: false,
        };

        this.updateTitle();
    }

    /**
     * The component mounted.
     */
    public async componentDidMount(): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        isNodeOnline().then(online => {
            this.setState({
                online,
            });
        });

        if (this.state.isLoggedIn) {
            this.validateTokenPeriodically();
        }

        EventAggregator.subscribe("auth-state", "app", isLoggedIn => {
            this.setState(
                {
                    isLoggedIn,
                },
                () => {
                    if (this.state.isLoggedIn) {
                        this.validateTokenPeriodically();
                    }
                },
            );
        });

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
                hidden: !this.state.isLoggedIn,
            },
            {
                label: "Peers",
                icon: <PeersIcon />,
                route: "/peers",
                hidden: !this.state.isLoggedIn,
            },
            {
                label: "Chains",
                icon: <ChainsIcon />,
                route: "/chains",
                hidden: !this.state.isLoggedIn,
            },
            {
                label: "Configuration",
                icon: <ConfigurationIcon />,
                route: "/configuration",
                hidden: !this.state.isLoggedIn,
            },
            {
                label: "L1",
                icon: <L1Icon />,
                route: "/l1",
                hidden: !this.state.isLoggedIn,
            },
            {
                label: "Users",
                icon: <UsersIcon />,
                route: "/users",
                hidden: !this.state.isLoggedIn,
            },
            {
                label: "Login",
                icon: <PadlockIcon />,
                route: "/login",
                hidden: this.state.isLoggedIn,
            },
            {
                label: "Logout",
                icon: <PadlockUnlockedIcon />,
                function: () => this._authService.logout(),
                hidden: !this.state.isLoggedIn,
            },
        ];

        const endSections = [
            {
                label: "Light",
                icon: <SunIcon />,
                function: () => this._themeService.apply("light", true),
                hidden: this.state.theme === "light",
            },
            {
                label: "Dark",
                icon: <MoonIcon />,
                function: () => this._themeService.apply("dark", true),
                hidden: this.state.theme === "dark",
            },
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
                    <div className="fill scroll-content">
                        {!this.state.online && <p className="padding-l">The node is offline or loading.</p>}
                        {this.state.online && <RoutesSwitcher isLoggedIn={this.state.isLoggedIn} />}
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
        try {
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
        } catch {
            this._authService.logout();
            this.clearTokenExpiryInterval();
        }
    }

    /**
     * Decode jwt to get expiry time.
     * @param token The jwt.
     * @returns The expiry time.
     */
    private getTokenExpiry(token: string) {
        const { exp } = decodeJWTPayload(token);
        const expiryTimestamp = (exp as number) * 1000;
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

export default App;
