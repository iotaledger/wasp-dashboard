import classNames from "classnames";
import React, { Component, ReactNode } from "react";
import "./TabPanel.scss";
import { TabPanelProps } from "./TabPanelProps";
import { TabPanelState } from "./TabPanelState";

/**
 * Tab panel.
 */
class TabPanel extends Component<TabPanelProps, TabPanelState> {
    /**
     * Create a new instance of TabPanel.
     * @param props The props.
     */
    constructor(props: TabPanelProps) {
        super(props);

        this.state = {
            activeTab: props.activeTab.toLowerCase()
        };
    }

    /**
     * The component updated.
     * @param prevProps The previous props.
     */
    public componentDidUpdate(prevProps: TabPanelProps): void {
        if (this.props.activeTab.toLowerCase() !== prevProps.activeTab.toLowerCase()) {
            this.setState({ activeTab: this.props.activeTab.toLowerCase() });
        }
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <div className="tab-panel">
                <div className="tab-panel-buttons">
                    {this.props.tabs.map(l => (
                        <button
                            key={l}
                            type="button"
                            className={classNames("tab-panel-button", {
                                "tab-panel-button-selected": l.toLowerCase() === this.state.activeTab
                            })}
                            onClick={e =>
                                this.setState({ activeTab: l.toLowerCase() }, () => {
                                    if (this.props.onTabChanged) {
                                        this.props.onTabChanged(this.state.activeTab);
                                    }
                                })}
                        >
                            <div>{l}</div>
                            <div className="underline" />
                        </button>
                    ))}
                </div>
                {this.props.children?.flat().map((c, idx) => (
                    <React.Fragment key={idx}>
                        {React.isValidElement(c) &&
                            c.props["data-label"] &&
                            c.props["data-label"].toLowerCase() === this.state.activeTab &&
                            c}
                    </React.Fragment>
                ))}
            </div>
        );
    }
}

export default TabPanel;
