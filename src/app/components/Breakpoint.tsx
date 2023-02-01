import React, { useState, useEffect } from "react";
import { BreakpointProps } from "./BreakpointProps";

const Breakpoint: React.FC<BreakpointProps> = props => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const SIZE_BREAKPOINTS = {
        phone: 480,
        tablet: 768,
        desktop: 1024,
    };

    /**
     * Resize handler.
     */
    function resize() {
        const windowSize = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        setIsVisible(
            props.aboveBelow === "above"
                ? windowSize >= SIZE_BREAKPOINTS[props.size]
                : windowSize < SIZE_BREAKPOINTS[props.size],
        );
    }

    useEffect(() => {
        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, [props.aboveBelow, props.size]);

    return isVisible ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <React.Fragment>{props.children}</React.Fragment>
    ) : null;
};

export default Breakpoint;
