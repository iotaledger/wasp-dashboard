import React from "react";

interface InfoBoxProps {
    title: string;
    children: React.ReactNode;
    categoryClassName?: string;
    titleClassName?: string;
    cardClassName?: string;
    titleWithIcon?: boolean;
    icon?: React.ReactNode;
}

// eslint-disable-next-line jsdoc/require-jsdoc
function InfoBox({
    title,
    children,
    categoryClassName,
    titleClassName,
    cardClassName,
    titleWithIcon,
    icon,
}: InfoBoxProps) {
    return (
        <div className={cardClassName ? `${cardClassName} card col fill` : "card col fill"}>
            <div className={categoryClassName ? `${categoryClassName}-summary` : ""}>
                {titleWithIcon ? (
                    <div className="row middle spread margin-b-m">
                        <h4 className={titleClassName ?? ""}>{title}</h4>
                        {titleWithIcon && icon}
                    </div>
                ) : (
                    <h4 className={titleClassName ?? ""}>{title}</h4>
                )}
                {children}
            </div>
        </div>
    );
}

InfoBox.defaultProps = {
    cardClassName: "",
    categoryClassName: "",
    icon: null,
    titleClassName: "",
    titleWithIcon: false,
};
export default InfoBox;
