import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets";
import { NavLink } from "./index";
import { NavLinkButton } from "./Navlink";

export interface BottomNavbarProps {
    navUrl: string;
    location: string;
    firstButton: NavLinkButton;
    previousButton: NavLinkButton;
    nextButton: NavLinkButton;
    lastButton: NavLinkButton;
    selectorOptions: string[];
    selectorChanged: (option: string) => void;
}

/**
 * Bottom navigation bar
 * @param param0 BottomNavbar options
 * @param param0.firstButton First button options
 * @param param0.previousButton Previous button options
 * @param param0.nextButton Next button options
 * @param param0.lastButton Last button options
 * @param param0.selectorOptions Selector options
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
    selectorOptions,
    location,
    selectorChanged,
    navUrl,
}: BottomNavbarProps) {
    return (
        <div className="card fill">
            <div className="summary row spread-centered middle">
                <NavLink
                    navUrl={navUrl}
                    button={firstButton}
                    label="First"
                    icon={<ChevronLeftIcon />}
                    codeRepetition={2}
                    iconFirst
                />
                <NavLink
                    navUrl={navUrl}
                    button={previousButton}
                    label="Previous"
                    icon={<ChevronLeftIcon />}
                    iconFirst
                />
                <div className="select-wrapper row middle range-wrapper">
                    {selectorOptions.length > 0 && (
                        <select value={location} onChange={e => selectorChanged(`${navUrl}/${e.target.value}`)}>
                            {selectorOptions?.map(option => (
                                <option key={option} value={option} className="padding-t">
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <NavLink navUrl={navUrl} button={nextButton} label="Next" icon={<ChevronRightIcon />} />
                <NavLink
                    navUrl={navUrl}
                    button={lastButton}
                    label="Latest"
                    icon={<ChevronRightIcon />}
                    codeRepetition={2}
                />
            </div>
        </div>
    );
}