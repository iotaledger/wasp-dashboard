import React from "react";
import "./Toggle.scss";

interface ToggleProps {
    active: boolean;
    onToggle: (current: boolean) => void;
    disabled?: boolean;
    leftLabel?: string;
    rightLabel?: string;
    smaller?: boolean;
}

/**
 * Toggle, also known as Switch
 * @param props Toggle props
 * @returns The node to render.
 */
export default function Toggle(props: ToggleProps) {
    return (
        <div className="toggle-wrapper">
            {props.leftLabel && <div className="toggle-label">{props.leftLabel}</div>}
            <div
                className={`toggle 
                    ${props.active ? "active" : ""} 
                    ${props.disabled ? "disabled" : ""} 
                    ${props.smaller ? "smaller" : ""}
                `}
                onClick={() => props.onToggle(props.active)}
            >
                <div className="toggle-indicator" />
            </div>
            {props.rightLabel && <div className="toggle-label">{props.rightLabel}</div>}
        </div>
    );
}

Toggle.defaultProps = {
    disabled: false,
    leftLabel: undefined,
    rightLabel: undefined,
    smaller: false,
};
