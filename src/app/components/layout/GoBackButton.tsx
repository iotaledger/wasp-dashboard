import React from "react";
import { Link } from "react-router-dom";
import "./GoBackButton.scss";
import { ReactComponent as ChevronLeft } from "../../../assets/chevron-left.svg";
interface GoBackButtonProps {
    goTo: string;
    text?: string;
}

/**
 *
 * @param goTo
 */

const GoBackButton = ({ goTo, text }: GoBackButtonProps) => (
    <Link className="back-link" to={goTo}>
        <ChevronLeft />
        <span>Back {text ? `to ${text}` : ""}</span>
    </Link>
);
GoBackButton.defaultProps = {
    text: "",
};

export default GoBackButton;
