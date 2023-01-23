import React, { PropsWithChildren } from "react";
import "./Tabs.scss";

/**
 * TabGroup.
 * @param props TabGroup props.
 * @param props.children Inner tabs.
 * @returns The node to render.
 */
const TabGroup: React.FC<PropsWithChildren> = ({ children }) => <div className="tab-group">{children}</div>;

export default TabGroup;
