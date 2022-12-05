import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as EyeClosedIcon } from "../../assets/eye-closed.svg";
import { ReactComponent as EyeIcon } from "../../assets/eye.svg";
import { ReactComponent as TrustedIcon } from "../../assets/health-good.svg";
import { ReactComponent as NotTrustedIcon } from "../../assets/health-warning.svg";
import { ServiceFactory } from "../../factories/serviceFactory";
import { EventAggregator } from "../../services/eventAggregator";
import { PeersService } from "../../services/peersServices";
import { SettingsService } from "../../services/settingsService";
import { PeeringNodeStatusResponse } from "../../services/wasp_client/models";
import "./PeersQuickList.scss";

/**
 * Component which provides a list of peers.
 * @returns The node to render.
 */
const PeersQuickList: React.FC = () => {
    /**
     * The settings service.
     * @private
     * @type {SettingsService}
     */
    const settingsService: SettingsService = ServiceFactory.get<SettingsService>("settings");
    const peersService: PeersService = ServiceFactory.get<PeersService>("peers-service");

    /**
     * The peers state.
     */
    const [peersState, setPeersState] = React.useState<PeeringNodeStatusResponse[]>(peersService.get());

    /**
     * The blind mode state.
     */
    const [blindMode, setBlindMode] = React.useState<boolean>(settingsService.getBlindMode());

    /**
     * The component mounted.
     * @returns {Promise<void>}
     */
    React.useEffect(() => {
        EventAggregator.subscribe("peers-state", "peers-quick-list", setPeersState);
    }, []);

    /**
     * Toggle the blind mode.
     */
    const toggleBlindMode = (): void => {
        const newBlindMode = !blindMode;
        setBlindMode(newBlindMode);
        settingsService.setBlindMode(newBlindMode);
    };

    /**
     * Return the component.
     * @returns The component.
     */
    return (
        <div className="peers-summary">
            <div className="row middle spread margin-b-m">
                <h4>Peers</h4>
                <button type="button" onClick={() => toggleBlindMode()} className="peers-summary--icon-button">
                    {blindMode ? <EyeIcon /> : <EyeClosedIcon />}
                </button>
            </div>
            {peersState.length === 0 ? (
                <p>There are no peers.</p>
            ) : (
                peersState?.map((p, idx) => (
                    <Link to={`/peers/${p.publicKey}`} key={idx} className="peers-summary--item">
                        <div className="peer-health-icon">{p.isTrusted ? <TrustedIcon /> : <NotTrustedIcon />}</div>
                        <div className="col">
                            {p.publicKey && (
                                <div className="peer-id">
                                    {blindMode ? "*".repeat(p.publicKey.length) : p.publicKey}
                                </div>
                            )}
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default PeersQuickList;
