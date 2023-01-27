import React from "react";
import "./InfoBox.scss";

interface InfoBoxProps {
    title: string;
    children: React.ReactNode;
    titleClassName?: string;
    cardClassName?: string;
    cornerNode?: React.ReactNode;
}

// eslint-disable-next-line jsdoc/require-jsdoc
function InfoBox({ title, children, titleClassName, cardClassName, cornerNode }: InfoBoxProps) {
    return (
        <div className={cardClassName ? `${cardClassName} card col fill` : "card col fill"}>
            <div className="summary">
                <div className="row middle spread margin-b-m">
                    <h4 className={titleClassName ?? ""}>{title}</h4>
                    {cornerNode}
                </div>
                {children}
            </div>
        </div>
    );
}

InfoBox.defaultProps = {
    cardClassName: "",
    cornerNode: null,
    titleClassName: "",
};
export default InfoBox;
