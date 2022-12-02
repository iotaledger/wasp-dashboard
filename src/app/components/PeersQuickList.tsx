import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as EyeClosedIcon } from "../../assets/eye-closed.svg";
import { ReactComponent as EyeIcon } from "../../assets/eye.svg";
import { ReactComponent as TrustedIcon } from "../../assets/health-good.svg";
import { ReactComponent as NotTrustedIcon } from "../../assets/health-warning.svg";
import { ServiceFactory } from "../../factories/serviceFactory";
import { SettingsService } from "../../services/settingsService";
import { PeeringNodeStatusResponse } from "../../services/wasp_client/models";
import { WaspClientService } from "../../services/waspClientService";
import "./PeersQuickList.scss";

/**
 * Component which provides a list of peers.
 * @param props The props.
 * @param props.peers - The peers.
 * @param props.onPeerClick - The callback to invoke when a peer is clicked.
 * @returns The node to render.
 */
function PeersQuickList(): JSX.Element {
    /**
     * The settings service.
     * @private
     * @type {SettingsService}
     */
    const settingsService: SettingsService = ServiceFactory.get<SettingsService>("settings");

    /**
     * The waspClient service.
     * @private
     * @type {WaspClientService}
     */
    const waspClientService: WaspClientService = ServiceFactory.get<WaspClientService>("wasp-client");

    /**
     * The component mounted.
     * @private
     * @returns {Promise<void>}
     */
    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => {
            try {
                const peers = await waspClientService.node().getAllPeers();
                handleData(peers);
            } catch (ex) {
                console.log(ex);
            }
        })();
    }, []);

    /**
     * The peers state.
     */
    const [peersState, setPeersState] = React.useState<PeeringNodeStatusResponse[]>([]);

    /**
     * The blind mode state.
     */
    const [blindMode, setBlindMode] = React.useState<boolean>(settingsService.getBlindMode());

    /**
     * Toggle the blind mode.
     */
    const toggleBlindMode = (): void => {
        const newBlindMode = !blindMode;
        setBlindMode(newBlindMode);
        settingsService.setBlindMode(newBlindMode);
    };

    /**
     * Handle the peer data.
     * @param peers The peers.
     */
    const handleData = (peers: PeeringNodeStatusResponse[]): void => {
        const sortedPeers = peers;
        setPeersState(sortedPeers);
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
            {!peersState && <p>There are no peers.</p>}

            {peersState?.map((p, idx) => (
                <Link to={`/peers/${p.netID}`} key={idx} className="peers-summary--item">
                    <div className="peer-health-icon">
                        {p.isTrusted && <TrustedIcon />}
                        {!p.isTrusted && <NotTrustedIcon />}
                    </div>
                    <div className="col">
                        {p.publicKey && (
                            <div className="peer-id">{blindMode ? "*".repeat(p.publicKey.length) : p.publicKey}</div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
}
export default PeersQuickList;
