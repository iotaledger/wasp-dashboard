import React, { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "../../assets";
import IconButton from "./IconButton";
import "./PasswordInput.scss";
interface PasswordInputProps {
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
}

/**
 *
 * @param disabled
 * @param onChange
 * @param inputValue
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
        <div className="blindmode">
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
            <IconButton
                tabIndex={-1}
                icon={blindMode ? <EyeIcon /> : <EyeClosedIcon />}
                onClick={toggleBlindMode}
                classnames="blindmode-input-button"
            />
        </div>
    );
};
PasswordInput.defaultProps = {
    disabled: false,
};

export default PasswordInput;
