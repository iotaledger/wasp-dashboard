import React, { useState } from "react";
import { Tooltip } from ".";
import { CopyIcon } from "../../assets";
import { copyToClipboard } from "../../lib/utils";
import "./CopiableValue.scss";

interface CopiableValueProps {
    value: string;
    children: React.ReactNode;
}

// eslint-disable-next-line jsdoc/require-jsdoc
function CopiableValue({ value, children }: CopiableValueProps) {
    const [showCopiedTooltip, setShowCopiedTooltip] = useState<boolean>(false);
    const handleCopyToClipboard = (copyValue: string) => {
        copyToClipboard(copyValue)
            .then(() => setShowCopiedTooltip(true))
            .finally(() => setTimeout(() => setShowCopiedTooltip(false), 1500));
    };

    return (
        <div className="copiable-value-wrapper">
            {children}
            <Tooltip message="Copied" show={showCopiedTooltip}>
                <button type="button" className="copiable-value-button" onClick={() => handleCopyToClipboard(value)}>
                    <CopyIcon />
                </button>
            </Tooltip>
        </div>
    );
}

export default CopiableValue;
