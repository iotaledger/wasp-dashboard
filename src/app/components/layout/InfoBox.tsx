import React from "react";

interface InfoBoxProps {
    title: string;
    children: React.ReactNode;
    classNameCategory?: string;
    classNameTitle?: string;
}

/**
 *
 * @param title.title
 * @param title
 * @param children
 * @param classNameCategory
 * @param classNameTitle
 * @param title.children
 * @param title.classNameCategory
 * @param title.classNameTitle
 */
function InfoBox({ title, children, classNameCategory, classNameTitle }: InfoBoxProps) {
    return (
        <div className="card col fill">
            <div className={classNameCategory ? `${classNameCategory}-summary` : ""}>
                <h4 className={classNameTitle ?? ""}>{title}</h4>
                {children}
            </div>
        </div>
    );
}

InfoBox.defaultProps = {
    classNameCategory: "",
    classNameTitle: "",
};
export default InfoBox;
