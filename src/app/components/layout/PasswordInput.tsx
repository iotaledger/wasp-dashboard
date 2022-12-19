import React from "react";
import { EyeClosedIcon, EyeIcon } from "../../../assets";

interface PasswordInputProps {
    blindMode: boolean;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    onClick: () => void;
}

/**
 *
 * @param goTo
 */

const PasswordInput = ({ blindMode, disabled, onChange, inputValue, onClick }: PasswordInputProps) => (
    <React.Fragment>
        <input
            type={blindMode ? "password" : "text"}
            className="input--stretch blindmode-input"
            placeholder="e.g. password"
            name="password"
            value={inputValue}
            disabled={disabled}
            onChange={onChange}
            autoComplete="new-password"
        />
        <button type="button" className="blindmode-input-button" onClick={onClick}>
            {blindMode ? <EyeClosedIcon /> : <EyeIcon />}
        </button>
    </React.Fragment>
);
PasswordInput.defaultProps = {
    disabled: false,
};

export default PasswordInput;
