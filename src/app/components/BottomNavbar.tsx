import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets";
import { NavLink } from "./index";
import { NavLinkButton } from "./Navlink";

export interface BottomNavbarProps {
    navUrl: string;
    firstButton: NavLinkButton;
    previousButton: NavLinkButton;
    nextButton: NavLinkButton;
    lastButton: NavLinkButton;
    pagesOptions: string[];
}

/**
 * Bottom navigation bar
 * @param param0 BottomNavbar options
 * @param param0.firstButton First button options
 * @param param0.previousButton Previous button options
 * @param param0.nextButton Next button options
 * @param param0.lastButton Last button options
 * @param param0.pagesOptions Selector options
 * @param param0.location Current location
 * @param param0.selectorChanged Selector changed event handler
 * @param param0.navUrl Navigation url
 * @returns The node to render.
 */
export default function BottomNavbar({
    firstButton,
    previousButton,
    nextButton,
    lastButton,
    pagesOptions,
    navUrl,
}: BottomNavbarProps) {
    return (
        <div className="card fill">
            <div className="summary row spread-centered middle">
                <NavLink
                    navUrl={navUrl}
                    button={previousButton}
                    label="Previous"
                    icon={<ChevronLeftIcon />}
                    iconFirst
                />
                <div className="row middle range-wrapper">
                    <NavLink navUrl={navUrl} button={firstButton} label={pagesOptions[0]} />
                    <span>. . .</span>
                    <NavLink navUrl={navUrl} button={lastButton} label={pagesOptions[pagesOptions.length - 1]} />
                </div>
                <NavLink navUrl={navUrl} button={nextButton} label="Next" icon={<ChevronRightIcon />} />
            </div>
        </div>
    );
}
