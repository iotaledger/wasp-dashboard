import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SettingsService, EventAggregator, ServiceFactory, BrandHelper } from "../../lib/classes";
import "./NavPanel.scss";
import { NavPanelProps } from "./NavPanelProps";

/**
 * Navigation panel.
 * @param props The navigation panel props
 * @returns The node to render.
 */
function NavPanel(props: NavPanelProps) {
    const settingsService = ServiceFactory.get<SettingsService>(SettingsService.ServiceName);
    const location = useLocation();

    const [logoSrc, setLogoSrc] = useState("");

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        BrandHelper.getLogoNavigation(settingsService.getTheme()).then(logo => {
            setLogoSrc(logo);
        });

        EventAggregator.subscribe("theme", "navmenu", async (theme: string) => {
            setLogoSrc(await BrandHelper.getLogoNavigation(theme));
        });

        return () => {
            EventAggregator.unsubscribe("theme", "navmenu");
        };
    }, []);

    return (
        <div className={classNames("nav-panel", { "full-width": props.fullWidth })}>
            <Link to="/">
                <img src={logoSrc} className="logo" />
            </Link>

            <div className="nav-panel-middle">
                {props.middle.map(b => (
                    <React.Fragment key={b.label}>
                        {!b.hidden && b.route && (
                            <Link
                                to={b.route}
                                className={classNames("nav-panel-button", {
                                    "nav-panel-button-selected":
                                        (b.route.length > 1 && location.pathname.startsWith(b.route)) ||
                                        b.route === location.pathname,
                                })}
                            >
                                {b.icon}
                                <span className="nav-panel-button-label">{b.label}</span>
                            </Link>
                        )}
                        {!b.hidden && b.function && (
                            <button
                                type="button"
                                onClick={() => b.function?.()}
                                className={classNames("nav-panel-button")}
                            >
                                {b.icon}
                                <span className="nav-panel-button-label">{b.label}</span>
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="nav-panel-end">
                {props.end.map(b => (
                    <React.Fragment key={b.label}>
                        {!b.hidden && b.route && (
                            <Link
                                to={b.route}
                                className={classNames("nav-panel-button", {
                                    "nav-panel-button-selected":
                                        (b.route.length > 1 && location.pathname.startsWith(b.route)) ||
                                        b.route === location.pathname,
                                })}
                            >
                                {b.icon}
                                <span className="nav-panel-button-label">{b.label}</span>
                            </Link>
                        )}
                        {!b.hidden && b.function && (
                            <button
                                type="button"
                                onClick={() => b.function?.()}
                                className={classNames("nav-panel-button")}
                            >
                                {b.icon}
                                <span className="nav-panel-button-label">{b.label}</span>
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default NavPanel;
