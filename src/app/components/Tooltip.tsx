/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */
import classNames from "classnames";
import React, { useRef } from "react";
import "./Tooltip.scss";

interface TooltipProps {
    children: React.ReactNode;
    message: string;
    show: boolean;
}

/**
 * Component to display a tooltip on click.
 */
const Tooltip: React.FC<TooltipProps> = ({ children, message, show }) => {
    const parentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="tooltip" ref={parentRef}>
            <div className={classNames("tooltip-wrapper", { show })}>
                {show && <div className="tooltip-message">{message}</div>}
            </div>
            {children}
        </div>
    );
};

export default Tooltip;
