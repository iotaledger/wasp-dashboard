import classNames from "classnames";
import React from "react";
import "./Spinner.scss";
import { SpinnerProps } from "./SpinnerProps";

/**
 * Component which will display a spinner.
 * @param props The props.
 * @returns The node to render.
 */
function Spinner(props: SpinnerProps): JSX.Element {
    return <div className={classNames("spinner", { "spinner-compact": props.compact })} />;
}

export default Spinner;
