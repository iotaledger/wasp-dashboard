import React from "react";
import "./Toggle.scss";

interface ToggleProps {
    active: boolean;
    onToggle: (current: boolean) => void;
    disabled?: boolean;
}

/**
 * Toggle, also known as Switch
 * @param props Toggle props
 * @returns The node to render.
 */
export default function Toggle(props: ToggleProps) {
    return (
        <div
            className={`toggle-container ${props.active ? "enabled" : ""} ${props.disabled ? "disabled" : ""}`}
            onClick={() => props.onToggle(props.active)}
        >
            <div className="toggle-indicator" />
        </div>
    );
}

Toggle.defaultProps = {
    disabled: false,
};
