import React from "react";

interface InfoBoxProps {
    title: string;
    children: React.ReactNode;
    classNameCategory?: string;
    classNameTitle?: string;
    classNameCard?: string;
    titleWithIcon?: boolean;
    icon?: React.ReactNode;
}

/**
 *
 * @param title.title
 * @param title
 * @param children
 * @param classNameCategory
 * @param classNameTitle
 * @param classNameCard
 * @param titleWithIcon
 * @param icon
 * @param title.children
 * @param title.classNameCategory
 * @param title.classNameTitle
 * @param title.classNameCard
 * @param title.titleWithIcon
 * @param title.icon
 */
function InfoBox({
    title,
    children,
    classNameCategory,
    classNameTitle,
    classNameCard,
    titleWithIcon,
    icon,
}: InfoBoxProps) {
    return (
        <div className={classNameCard ? `${classNameCard} card col fill` : "card col fill"}>
            <div className={classNameCategory ? `${classNameCategory}-summary` : ""}>
                {titleWithIcon ? (
                    <div className="row middle spread margin-b-m">
                        <h4 className={classNameTitle ?? ""}>{title}</h4>
                        {titleWithIcon && icon}
                    </div>
                ) : (
                    <h4 className={classNameTitle ?? ""}>{title}</h4>
                )}
                {children}
            </div>
        </div>
    );
}

InfoBox.defaultProps = {
    classNameCard: "",
    classNameCategory: "",
    classNameTitle: "",
    icon: null,
    titleWithIcon: false,
};
export default InfoBox;
