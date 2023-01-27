import React from "react";
import { Link } from "react-router-dom";

export interface NavLinkButton {
    enabled: boolean;
    value?: string;
}

NavLink.defaultProps = {
    doubledIcon: false,
    icon: undefined,
    iconFirst: false,
};

/**
 * A Link to navigate between pages.
 * @param param0 BlockLink options
 * @param param0.label Label.
 * @param param0.button Button configuration.
 * @param param0.icon Link's icon.
 * @param param0.doubledIcon Double the icon or not.
 * @param param0.iconFirst Show the icon before the text.
 * @param param0.navUrl The navigatio URL prefix for the links.
 * @returns The Node to render.
 */
export default function NavLink({
    label,
    navUrl,
    button,
    icon,
    doubledIcon,
    iconFirst,
}: {
    label: string;
    navUrl: string;
    button: NavLinkButton;
    icon?: React.ReactNode;
    doubledIcon?: boolean;
    iconFirst?: boolean;
}) {
    return (
        <Link to={`${navUrl}${button.value}`} className={`nav-link ${!button.enabled && "disabled"}`}>
            {iconFirst ? (
                <React.Fragment>
                    <div className="first-icon">
                        {icon}
                        {doubledIcon && icon}
                    </div>
                    <span>{label}</span>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <span>{label}</span>
                    <div>
                        {icon}
                        {doubledIcon && icon}
                    </div>
                </React.Fragment>
            )}
        </Link>
    );
}
