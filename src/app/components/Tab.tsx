import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Tabs.scss";

interface TabProps {
    to: string;
    label: string;
    extraMatchingRoutes?: string[];
}

/**
 * Tab
 * @param props Tab props.
 * @param props.to Location to go to.
 * @param props.label The location label.
 * @param props.extraMatchingRoutes Extra routes to mark this tab as active.
 * @returns The node to render.
 */
const Tab: React.FC<TabProps> = ({ to, label, extraMatchingRoutes }) => {
    const location = useLocation();
    const isActive = to === location.pathname;
    const extraRoutesMatch = extraMatchingRoutes?.some(route => location.pathname.startsWith(route));

    return (
        <Link to={to}>
            <div className={`tab ${isActive || extraRoutesMatch ? "tab-active" : ""}`}>
                <span>{label}</span>
            </div>
        </Link>
    );
};

Tab.defaultProps = {
    extraMatchingRoutes: [],
};

export default Tab;
