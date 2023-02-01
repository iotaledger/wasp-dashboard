import "./App.scss";

import React, { useEffect, useState } from "react";
import { ReactComponent as ConfigurationIcon } from "../assets/configuration.svg";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as L1Icon } from "../assets/l1.svg";
import { ReactComponent as MoonIcon } from "../assets/moon.svg";
import { ReactComponent as PadlockUnlockedIcon } from "../assets/padlock-unlocked.svg";
import { ReactComponent as PadlockIcon } from "../assets/padlock.svg";
import { ReactComponent as SunIcon } from "../assets/sun.svg";
import { ReactComponent as UsersIcon } from "../assets/users.svg";
import {
    ServiceFactory,
    AuthService,
    EventAggregator,
    MetricsService,
    SettingsService,
    BrandHelper,
} from "../lib/classes";
import { isNodeOnline } from "../lib/utils";
import { Breakpoint, DesktopMenu, MobileMenu } from "./components";
import RoutesSwitcher from "./routes/RoutesSwitcher";

/**
 * The app.
 * @returns The element to render.
 */
function App() {
    /**
     * Create a new instance of App.
     * @param props The props.
     */

    const settingsService = ServiceFactory.get<SettingsService>(SettingsService.ServiceName);
    const authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);
    const metricsService = ServiceFactory.get<MetricsService>(MetricsService.ServiceName);
    // const lastStatus = 0;

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(authService.isLoggedIn()));
    const [theme, setTheme] = useState<string>(settingsService.getTheme());
    const [online, setOnline] = useState<boolean>(false);
    // const [syncHealth, setSyncHealth] = useState<boolean>(false);
    // const [nodeHealth, setNodeHealth] = useState<boolean>(false);

    const alias = "";
    const lmi = "";
    const cmi = "";
    let statusSubscription: string | undefined;
    let syncStatusSubscription: string | undefined;
    let publicNodeStatusSubscription: string | undefined;
    let statusTimer: NodeJS.Timeout | undefined;

    /**
     *
     */
    function updateTitle(): void {
        let title = BrandHelper.getConfiguration().name;
        if (alias) {
            title += ` (${alias})`;
        }
        if (lmi && cmi) {
            title += ` ${cmi} / ${lmi}`;
        }
        document.title = title;
    }

    /**
     * The component mounted.
     */

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        isNodeOnline().then(_online => {
            setOnline(_online);
        });

        EventAggregator.subscribe("auth-state", "app", (_isLoggedIn: boolean) => {
            setIsLoggedIn(_isLoggedIn);
        });

        EventAggregator.subscribe("theme", "app", (_theme: string) => {
            setTheme(_theme);
        });

        /*
        statusSubscription = metricsService.subscribe<INodeStatus>(
            WebSocketTopic.NodeStatus,
            data => {
                if (data && data.nodeAlias !== alias) {
                    alias = data.nodeAlias;
                    updateTitle();
                }
            },
        );

        syncStatusSubscription = metricsService.subscribe<ISyncStatus>(
            WebSocketTopic.SyncStatus,
            data => {
                if (data) {
                    const lmi = data.lmi ? data.lmi.toString() : "";
                    const smi = data.cmi ? data.cmi.toString() : "";

                    if (lmi !== lmi || smi !== cmi) {
                        cmi = smi;
                        lmi = lmi;
                        updateTitle();
                    }
                }
            },
        );

        publicNodeStatusSubscription = metricsService.subscribe<IPublicNodeStatus>(
            WebSocketTopic.PublicNodeStatus,
            data => {
                if (data) {
                    lastStatus = Date.now();
                    if (!online) {
                        EventAggregator.publish("online", true);
                        setOnline(true);
                    }
                    if (data.isHealthy !== nodeHealth) {
                        setNodeHealth(data.isHealthy);
                    }
                    if (data.isSynced !== syncHealth) {
                        setSyncHealth(data.isSynced);
                    }
                }
            },
        );

        statusTimer = setInterval(() => {
            if (Date.now() - lastStatus > 30000 && online) {
                setOnline(false);
                EventAggregator.publish("online", false);
            }
        }, 1000);
        */

        updateTitle();

        return () => {
            EventAggregator.unsubscribe("auth-state", "app");
            EventAggregator.unsubscribe("theme", "app");

            if (statusSubscription) {
                metricsService.unsubscribe(statusSubscription);
                statusSubscription = undefined;
            }

            if (syncStatusSubscription) {
                metricsService.unsubscribe(syncStatusSubscription);
                syncStatusSubscription = undefined;
            }

            if (publicNodeStatusSubscription) {
                metricsService.unsubscribe(publicNodeStatusSubscription);
                publicNodeStatusSubscription = undefined;
            }

            if (statusTimer !== undefined) {
                clearInterval(statusTimer);
                statusTimer = undefined;
            }
        };
    }, []);

    const sections = [
        {
            label: "Home",
            icon: <HomeIcon />,
            route: "/",
            extraMatchingRoutes: ["/chains"],
            hidden: !isLoggedIn,
        },
        {
            label: "Configuration",
            icon: <ConfigurationIcon />,
            route: "/configuration",
            hidden: !isLoggedIn,
        },
        {
            label: "L1",
            icon: <L1Icon />,
            route: "/l1",
            hidden: !isLoggedIn,
        },
        {
            label: "Users",
            icon: <UsersIcon />,
            route: "/users",
            hidden: !isLoggedIn,
        },
        {
            label: "Login",
            icon: <PadlockIcon />,
            route: "/login",
            hidden: isLoggedIn,
        },
        {
            label: "Logout",
            icon: <PadlockUnlockedIcon />,
            function: () => authService.logout(),
            hidden: !isLoggedIn,
        },
    ];

    const endSections = [
        {
            label: "Light",
            icon: <SunIcon />,
            function: () => settingsService.applyTheme("light", true),
            hidden: theme === "light",
        },
        {
            label: "Dark",
            icon: <MoonIcon />,
            function: () => settingsService.applyTheme("dark", true),
            hidden: theme === "dark",
        },
    ];

    return (
        <div className="app">
            <Breakpoint size="tablet" aboveBelow="above">
                <DesktopMenu fullWidth={false} middle={online ? sections : []} end={online ? endSections : []} />
            </Breakpoint>
            <Breakpoint size="tablet" aboveBelow="below">
                <MobileMenu fullWidth={false} middle={online ? sections : []} end={online ? endSections : []} />
            </Breakpoint>
            <div className="col fill">
                <div className="fill scroll-content">
                    {!online && <p className="padding-l">The node is offline or loading.</p>}
                    {online && <RoutesSwitcher isLoggedIn={isLoggedIn} />}
                </div>
            </div>
        </div>
    );
}

export default App;
