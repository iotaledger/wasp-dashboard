import React from "react";
import { Action } from "../../lib";

const DISABLED_MESSAGE = "You cannot use this action.";

interface IconButtonProps {
    classnames?: string;
    icon: React.ReactNode;
    type?: Action;
    onClick: () => void;
    tabIndex?: number;
    disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
    icon,
    type,
    onClick,
    classnames,
    tabIndex,
    disabled,
}: IconButtonProps) => (
    <button
        tabIndex={tabIndex}
        disabled={disabled}
        className={`${
            type ? (type === Action.Delete ? "action-button-danger action-button" : "action-button") : ""
        } ${classnames} ${disabled ? "disabled" : ""}`}
        type="button"
        title={disabled ? DISABLED_MESSAGE : undefined}
        onClick={onClick}
    >
        {icon}
    </button>
);

IconButton.defaultProps = {
    classnames: "",
    disabled: false,
    tabIndex: undefined,
    type: undefined,
};
export default IconButton;
