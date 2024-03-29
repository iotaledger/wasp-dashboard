import React from "react";
import { Link } from "react-router-dom";

export interface NavLinkButton {
    enabled: boolean;
    value?: string;
}

NavLink.defaultProps = {
    codeRepetition: 1,
    hasIcon: false,
    icon: undefined,
    iconFirst: false,
};

/**
 * A Link to navigate between pages.
 * @param param0 BlockLink options
 * @param param0.label Label.
 * @param param0.button Button configuration.
 * @param param0.icon Link's icon.
 * @param param0.iconFirst Show the icon before the text.
 * @param param0.navUrl The navigatio URL prefix for the links.
 * @param param0.codeRepetition How many times to repeat the code.
 * @param param0.hasIcon Whether the link has an icon.
 * @returns The Node to render.
 */
export default function NavLink({
    label,
    navUrl,
    button,
    icon,
    codeRepetition = 1,
    iconFirst,
    hasIcon,
}: {
    label: string;
    navUrl: string;
    button: NavLinkButton;
    icon?: React.ReactNode;
    iconFirst?: boolean;
    codeRepetition?: number;
    hasIcon?: boolean;
}) {
    return (
        <Link to={`${navUrl}${button.value}`} className={`nav-link ${!button.enabled && "disabled"}`}>
            <div className={`${hasIcon ? (iconFirst ? "row" : "row-reverse") : ""} middle`}>
                <div className={`${hasIcon ? (iconFirst ? "margin-r-t" : "margin-l-t") : ""} row`}>
                    {Array.from({ length: codeRepetition }, (_, i) => (
                        <React.Fragment key={i}>{icon}</React.Fragment>
                    ))}
                </div>
                <span>{label}</span>
            </div>
        </Link>
    );
}
