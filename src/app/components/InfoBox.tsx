import React from "react";
import "./InfoBox.scss";

interface InfoBoxProps {
    title?: string;
    children: React.ReactNode;
    titleClassName?: string;
    cardClassName?: string;
    titleWithIcon?: boolean;
    icon?: React.ReactNode;
}

// eslint-disable-next-line jsdoc/require-jsdoc
function InfoBox({ title, children, titleClassName, cardClassName, titleWithIcon, icon }: InfoBoxProps) {
    return (
        <div className={cardClassName ? `${cardClassName} card col fill` : "card col fill"}>
            <div className="summary">
                {title && (
                    <div className="row middle spread margin-b-m">
                        <h4 className={titleClassName ?? ""}>{title}</h4>
                        {titleWithIcon && icon}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

InfoBox.defaultProps = {
    cardClassName: "",
    icon: null,
    title: "",
    titleClassName: "",
    titleWithIcon: false,
};
export default InfoBox;
