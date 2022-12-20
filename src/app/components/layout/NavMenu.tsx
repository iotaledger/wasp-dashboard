import React, { useEffect, useState } from "react";
import { ServiceFactory } from "../../../factories/serviceFactory";
import { EventAggregator } from "../../../services/eventAggregator";
import { ThemeService } from "../../../services/themeService";
import { BrandHelper } from "../../../utils/brandHelper";
import "./NavMenu.scss";
import { NavMenuProps } from "./NavMenuProps";

/**
 * Navigation menu.
 * @param props The navigation menu props
 * @returns The node to render.
 */
function NavMenu(props: NavMenuProps) {
    const themeService = ServiceFactory.get<ThemeService>(ThemeService.ServiceName);

    const [logoSrc, setLogoSrc] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        BrandHelper.getLogoNavigation(themeService.get()).then(logo => {
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
        <div className="nav-menu" onClick={() => isOpen && setIsOpen(false)}>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
                <img src={logoSrc} className="logo" />
            </button>
            {isOpen && <div className="popup-container">{props.children}</div>}
        </div>
    );
}

export default NavMenu;
