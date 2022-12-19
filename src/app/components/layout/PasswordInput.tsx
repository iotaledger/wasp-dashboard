import React, { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "../../../assets";

interface PasswordInputProps {
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
}

/**
 *
 * @param goTo
 */

const PasswordInput = ({ disabled, onChange, inputValue }: PasswordInputProps) => {
    const [blindMode, setBlindMode] = useState<boolean>(true);

    /**
     * Toggle the blind mode.
     */
    function toggleBlindMode(): void {
        setBlindMode(!blindMode);
    }

    return (
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
            <button type="button" className="blindmode-input-button" onClick={toggleBlindMode}>
                {blindMode ? <EyeClosedIcon /> : <EyeIcon />}
            </button>
        </React.Fragment>
    );
};
PasswordInput.defaultProps = {
    disabled: false,
};

export default PasswordInput;
