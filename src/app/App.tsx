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
import { ServiceFactory, AuthService, EventAggregator, SettingsService, BrandHelper } from "../lib/classes";
import { isNodeOnline } from "../lib/utils";
import { Breakpoint, DesktopMenu, MobileMenu, Spinner } from "./components";
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

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(authService.isLoggedIn()));
    const [theme, setTheme] = useState<string>(settingsService.getTheme());
    const [online, setOnline] = useState<boolean>(false);
    const [isNodeLoading, setIsNodeLoading] = useState<boolean>(false);

    const alias = "";
    const lmi = "";
    const cmi = "";

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
        setIsNodeLoading(true);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        isNodeOnline()
            .then(_online => {
                setOnline(_online);
                setIsNodeLoading(false);
            })
            .catch(e => {
                setOnline(false);
                console.error(e);
            });

        EventAggregator.subscribe("auth-state", "app", (_isLoggedIn: boolean) => {
            setIsLoggedIn(_isLoggedIn);
        });

        EventAggregator.subscribe("theme", "app", (_theme: string) => {
            setTheme(_theme);
        });

        updateTitle();

        return () => {
            EventAggregator.unsubscribe("auth-state", "app");
            EventAggregator.unsubscribe("theme", "app");

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
            hidden: !isLoggedIn || !authService.isAuthRequired(),
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
                    {isNodeLoading ? (
                        <div className="main">
                            <div className="row middle margin-t-m">
                                <Spinner />
                            </div>
                        </div>
                    ) : (online ? (
                        <RoutesSwitcher isLoggedIn={isLoggedIn} />
                    ) : (
                        <div className="main">
                            <p className="margin-t-m">The node is offline.</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
