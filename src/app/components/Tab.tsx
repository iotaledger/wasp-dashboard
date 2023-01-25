import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Tabs.scss";

interface TabProps {
    to: string;
    label: string;
    extraMatchingRoutes?: string[];
    exact?: boolean;
}

/**
 * Tab
 * @param props Tab props.
 * @param props.to Location to go to.
 * @param props.label The location label.
 * @param props.exact If the route match must be exact or not.
 * @param props.extraMatchingRoutes Extra routes to mark this tab as active.
 * @returns The node to render.
 */
const Tab: React.FC<TabProps> = ({ exact, to, label, extraMatchingRoutes }) => {
    const location = useLocation();
    const isActive = exact ? to === location.pathname : location.pathname.startsWith(to);
    const extraRoutesMatch = extraMatchingRoutes?.some(route => location.pathname.startsWith(route));

    return (
        <Link to={to}>
            <div className={`tab ${(isActive || extraRoutesMatch) && "tab-active"}`}>
                <span>{label}</span>
            </div>
        </Link>
    );
};

Tab.defaultProps = {
    exact: false,
    extraMatchingRoutes: [],
};

export default Tab;
