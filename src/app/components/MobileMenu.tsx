import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, CloseIcon } from "../../assets";
import { SettingsService, EventAggregator, ServiceFactory, BrandHelper } from "../../lib/classes";
import "./MobileMenu.scss";
import { MenuProps } from "./MenuProps";

/**
 * Navigation panel.
 * @param props The navigation panel props
 * @returns The node to render.
 */
function MobileMenu(props: MenuProps) {
    const settingsService = ServiceFactory.get<SettingsService>(SettingsService.ServiceName);
    const location = useLocation();

    const [logoSrc, setLogoSrc] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        BrandHelper.getLogoNavigation(settingsService.getTheme())
            .then(logo => {
                setLogoSrc(logo);
            })
            .catch(e => {
                console.error(e);
            });

        EventAggregator.subscribe("theme", "navmenu", async (theme: string) => {
            setLogoSrc(await BrandHelper.getLogoNavigation(theme));
        });
        console.log("isOpen:", isOpen);
        return () => {
            EventAggregator.unsubscribe("theme", "navmenu");
        };
    }, []);
    /**
     * Toggle the menu.
     */
    function toggleMenu() {
        setIsOpen(!isOpen);
    }
    return (
        <div className={classNames("mobile-panel", { "full-width": props.fullWidth })}>
            <Link to="/">
                <img src={logoSrc} className="logo" />
            </Link>
            <div className="mobile-items-wrapper">
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
                            </Link>
                        )}
                        {!b.hidden && b.function && (
                            <button
                                type="button"
                                onClick={() => b.function?.()}
                                className={classNames("nav-panel-button")}
                            >
                                {b.icon}
                            </button>
                        )}
                    </React.Fragment>
                ))}
                <MenuIcon className="menu-icon" onClick={toggleMenu} />
            </div>
            {isOpen && (
                <div className="mobile-panel-items">
                    <div className="close-icon">
                        <CloseIcon onClick={toggleMenu} />
                    </div>
                    {props.middle.map(b => (
                        <React.Fragment key={b.label}>
                            {!b.hidden && b.route && (
                                <Link
                                    onClick={toggleMenu}
                                    to={b.route}
                                    className={classNames("mobile-panel-item", {
                                        "mobile-panel-item-selected":
                                            (b.route.length > 1 && location.pathname.startsWith(b.route)) ||
                                            b.route === location.pathname,
                                    })}
                                >
                                    {b.icon}
                                    <span className="mobile-panel-item-label">{b.label}</span>
                                </Link>
                            )}
                            {!b.hidden && b.function && (
                                <button
                                    type="button"
                                    onClick={() => b.function?.()}
                                    className={classNames("mobile-panel-item last")}
                                >
                                    {b.icon}
                                    <span className="mobile-panel-item-label">{b.label}</span>
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MobileMenu;
