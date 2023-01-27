import React from "react";
import { Action } from "../../lib";

interface IconButtonProps {
    classnames?: string;
    icon: React.ReactNode;
    type?: Action | undefined;
    onClick: () => void;
    tabIndex?: number;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, type, onClick, classnames, tabIndex }: IconButtonProps) => (
    <button
        tabIndex={tabIndex}
        className={`${
            type ? (type === Action.Delete ? "action-button-danger action-button" : "action-button") : ""
        } ${classnames}`}
        type="button"
        onClick={onClick}
    >
        {icon}
    </button>
);

IconButton.defaultProps = {
    classnames: "",
    tabIndex: undefined,
    type: undefined,
};
export default IconButton;
