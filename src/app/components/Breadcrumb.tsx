/* eslint-disable jsdoc/require-param */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.scss";

interface BreadcrumbProps {
    breadcrumbs: Breadcrumb[];
}

interface Breadcrumb {
    goTo: string;
    text: string;
}

/**
 * Breadcrumbs.
 * @param props The breadcrumbs options.
 * @param props.breadcrumbs The breadcrumbs to render.
 * @returns The node to render.
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
    const location = useLocation();

    return (
        <div className="breadcrumbs">
            {breadcrumbs.map((breadcrumb, index) => {
                const isLast = breadcrumbs.length - 1 === index;
                const isActive = isLast ?? location.pathname === breadcrumb.goTo;

                return (
                    <Link
                        className={`${isActive ? "active-path" : ""} nav-link margin-r-t`}
                        to={breadcrumb.goTo}
                        key={index}
                    >
                        <span className={isLast ? "last-item" : ""}>{breadcrumb.text}</span>
                        {!isLast && "/"}
                    </Link>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
