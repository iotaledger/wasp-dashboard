import React, { Dispatch, SetStateAction, useState } from "react";
import zxcvbn from "zxcvbn";
import { EyeClosedIcon, EyeIcon } from "../../../assets";
import "./PasswordInput.scss";

interface PasswordInputProps {
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    error?: Dispatch<SetStateAction<string | null>>;
}

/**
 *
 * @param disabled
 * @param onChange
 * @param inputValue
 */

const PasswordInput = ({ disabled, onChange, inputValue, error }: PasswordInputProps) => {
    const [blindMode, setBlindMode] = useState<boolean>(true);

    /**
     * Toggle the blind mode.
     */
    function toggleBlindMode(): void {
        setBlindMode(!blindMode);
    }

    /**
     *
     * @param e
     */
    function handlePasswordOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const passwordStrength = zxcvbn(e.target.value);
        if (e.target.value !== "" && passwordStrength.score < 2) {
            error?.(passwordStrength.feedback.suggestions.join(" "));
        } else {
            error?.(null);
        }
        onChange(e);
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
                onChange={handlePasswordOnChange}
                autoComplete="new-password"
            />
            <button tabIndex={-1} type="button" className="blindmode-input-button" onClick={toggleBlindMode}>
                {blindMode ? <EyeIcon /> : <EyeClosedIcon />}
            </button>
        </div>
    );
};
PasswordInput.defaultProps = {
    disabled: false,
    error: null,
};

export default PasswordInput;
