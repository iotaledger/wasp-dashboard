import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";
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
 * @param breadcrumbs The breadcrumbs to render.
 * @returns The node to render.
 */

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
    const location = useLocation();

    return (
        <div className="row middle">
            {breadcrumbs.map((breadcrumb, index) => (
                <Link
                    className={`${
                        location.pathname === breadcrumb.goTo ? "active-path" : ""
                    } nav-link margin-r-t margin-b-m`}
                    to={breadcrumb.goTo}
                    key={index}
                >
                    <span className={index === breadcrumbs.length - 1 ? "last-item" : ""}>{breadcrumb.text}</span>
                    {index < breadcrumbs.length - 1 && <ChevronRight />}
                </Link>
            ))}
        </div>
    );
};

export default Breadcrumb;
