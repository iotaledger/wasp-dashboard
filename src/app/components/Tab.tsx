import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Tabs.scss";

interface TabProps {
    to: string;
    label: string;
}

/**
 * Tab
 * @param props Tab props.
 * @param props.to Location to go to.
 * @param props.label The location label.
 * @returns The node to render.
 */
const Tab: React.FC<TabProps> = ({ to, label }) => {
    const location = useLocation();
    const isActive = to === location.pathname;

    return (
        <Link to={to}>
            <div className={`tab ${isActive ? "tab-active" : ""}`}>
                <span>{label}</span>
            </div>
        </Link>
    );
};

export default Tab;
