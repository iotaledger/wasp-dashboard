import React, { ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "../../assets/chevron-left.svg";
import { ReactComponent as ConfirmationIcon } from "../../assets/confirmation.svg";
import { ReactComponent as EyeClosedIcon } from "../../assets/eye-closed.svg";
import { ReactComponent as EyeIcon } from "../../assets/eye.svg";
import { ReactComponent as MilestoneIcon } from "../../assets/milestone.svg";
import { ReactComponent as PruningIcon } from "../../assets/pruning.svg";
import { ServiceFactory } from "../../factories/serviceFactory";
import { ChainService } from "../../services/chainService";
import { SettingsService } from "../../services/settingsService";
import { WaspClientService } from "../../services/waspClientService";
import AsyncComponent from "../components/layout/AsyncComponent";
import { ChainRouteProps } from "./ChainRouteProps";
import { ChainState } from "./ChainState";
import "./Peer.scss";
import { PeerRouteProps } from "./PeerRouteProps";

/**
 * Peer panel.
 */
class Chain extends AsyncComponent<RouteComponentProps<ChainRouteProps>, ChainState> {
    /**
     * The wasp client service.
     */
    private readonly _waspClientService: WaspClientService;

    /**
     * The chain service.
     */
    private readonly _chainService: ChainService;


    /**
     * The settings service.
     */
    private readonly _settingsService: SettingsService;

    /**
     * Create a new instance of Peers.
     * @param props The props.
     */
    constructor(props: RouteComponentProps<ChainRouteProps>) {
        super(props);

        this._waspClientService = ServiceFactory.get<WaspClientService>("wasp-client");
        this._chainService = ServiceFactory.get<ChainService>("chain-service");
        this._settingsService = ServiceFactory.get<SettingsService>("settings");

        this.state = {
            lastUpdateTime: 0,
            blindMode: false
        };
    }

    /**
     * The component mounted.
     */
    public async componentDidMount(): Promise<void> {
        super.componentDidMount();
        console.log(this.props)
        const chainId = this.props.match.params.chainId;
        console.log(`ChainID: ${chainId}`);
        const accounts = await this._chainService.getAccounts(chainId);
        console.log(accounts)
    }

    /**
     * The component will unmount.
     */
    public componentWillUnmount(): void {
        super.componentWillUnmount();
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <div className="chain">
                            
            </div>
        );
    }

    /**
     * Toggle the flag for blind mode.
     */
    private toggleBlindMode(): void {
        this._settingsService.setBlindMode(!this.state.blindMode);
        this.setState({ blindMode: !this.state.blindMode });
    }
}

export default withRouter(Chain);
