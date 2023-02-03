import React from "react";
import "./InfoBox.scss";

interface InfoBoxProps {
    title?: string;
    children: React.ReactNode;
    titleClassName?: string;
    cardClassName?: string;
    action?: React.ReactNode;
}

// eslint-disable-next-line jsdoc/require-jsdoc
function InfoBox({ title, children, titleClassName, cardClassName, action }: InfoBoxProps) {
    return (
        <div className={cardClassName ? `${cardClassName} card col fill` : "card col fill"}>
            <div className="summary">
                {title && (
                    <div className="row middle spread margin-b-m">
                        <h4 className={titleClassName ?? ""}>{title}</h4>
                        {action}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

InfoBox.defaultProps = {
    action: null,
    cardClassName: "",
    title: "",
    titleClassName: "",
};
export default InfoBox;
