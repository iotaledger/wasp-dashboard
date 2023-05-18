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
    currentPage: number;
    previousCurrentPage?: number;
    nextPreviousPage?: number;
}

/**
 * Bottom navigation bar
 * @param param0 BottomNavbar options
 * @param param0.firstButton First button options
 * @param param0.previousButton Previous button options
 * @param param0.nextButton Next button options
 * @param param0.lastButton Last button options
 * @param param0.pagesOptions Selector options
 * @param param0.navUrl Navigation url
 * @param param0.currentPage Current page
 * @param param0.nextPreviousPage Next previous page
 * @param param0.previousCurrentPage Previous current page
 * @returns The node to render.
 */
export default function BottomNavbar({
    firstButton,
    previousButton,
    nextButton,
    lastButton,
    pagesOptions,
    navUrl,
    currentPage,
    previousCurrentPage,
    nextPreviousPage,
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
                    hasIcon
                />
                <div className="row middle range-wrapper">
                    {currentPage !== 0 && (
                        <NavLink iconFirst navUrl={navUrl} button={firstButton} label={pagesOptions[0]} />
                    )}
                    {currentPage > 1 && previousCurrentPage && (
                        <React.Fragment>
                            <span>...</span>
                            <NavLink
                                navUrl={navUrl}
                                button={previousButton}
                                label={pagesOptions[previousCurrentPage]}
                            />
                        </React.Fragment>
                    )}
                    <span className="active">{currentPage}</span>
                    {currentPage < pagesOptions.length - 2 && nextPreviousPage && (
                        <React.Fragment>
                            {nextPreviousPage && (
                                <NavLink navUrl={navUrl} button={nextButton} label={pagesOptions[nextPreviousPage]} />
                            )}
                            <span>...</span>
                        </React.Fragment>
                    )}
                    {currentPage !== pagesOptions.length - 1 && (
                        <NavLink navUrl={navUrl} button={lastButton} label={pagesOptions[pagesOptions.length - 1]} />
                    )}
                </div>
                <NavLink navUrl={navUrl} button={nextButton} label="Next" icon={<ChevronRightIcon />} hasIcon />
            </div>
        </div>
    );
}

BottomNavbar.defaultProps = {
    nextPreviousPage: undefined,
    previousCurrentPage: undefined,
};
