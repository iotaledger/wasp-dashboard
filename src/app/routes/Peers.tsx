import "./Peers.scss";

import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { EyeClosedIcon, EyeIcon } from "../../assets";
import { ServiceFactory } from "../../factories/serviceFactory";
import { PeerActions } from "../../lib/interfaces";
import { EventAggregator } from "../../services/eventAggregator";
import { PeersService } from "../../services/peersService";
import { SettingsService } from "../../services/settingsService";
import { PeeringNodeStatusResponse } from "../../services/wasp_client";
import { PeersList } from "../components";
import Dialog from "../components/layout/Dialog";
import Spinner from "../components/layout/Spinner";

interface DialogState {
    dialogStatus?: string;
    dialogBusy?: boolean;
    dialogIsEdit?: boolean;
    dialogPeerAddress?: string;
    dialogPeerAlias?: string;
    dialogType?: string;
    dialogPeerId?: string;
    dialogPeerIdOriginal?: string;
}

const Peers: React.FC = () => {
    /**
     * The settings service.
     * @private
     * @type {SettingsService}
     */
    const settingsService: SettingsService = ServiceFactory.get<SettingsService>("settings");

    /**
     * The peers service.
     * @private
     * @type {PeersService}
     */
    const peersService: PeersService = ServiceFactory.get<PeersService>("peers-service");

    /**
     * The peers state.
     */
    const [peersList, setPeersList] = useState<PeeringNodeStatusResponse[]>(peersService.get());

    /**
     * The blind mode state.
     */
    const [blindMode, setBlindMode] = useState<boolean>(settingsService.getBlindMode());

    /**
     * The dialog state.
     */
    const [dialogState, setDialogState] = useState<DialogState>();

    /**
     * The component mounted.
     * @returns {Promise<void>}
     */
    useEffect(() => {
        EventAggregator.subscribe("peers-state", "peers-quick-list", setPeersList);
    }, []);

    /**
     * Toggle the blind mode.
     */
    const toggleBlindMode: () => void = () => {
        const newBlindMode = !blindMode;
        setBlindMode(newBlindMode);
        settingsService.setBlindMode(newBlindMode);
    };

    const handleSetDialogState: () => void = () => {
        setDialogState({
            dialogType: "add",
            dialogIsEdit: true,
            dialogPeerId: "",
            dialogPeerAddress: "",
            dialogPeerAlias: "",
            dialogStatus: "",
            dialogBusy: false,
        });
    };

    /**
     * Trust action in the peer list.
     * @param peer The peer to trust.
     */
    async function trustPeer(peer: PeeringNodeStatusResponse) {
        await peersService.trustPeer(peer);
    }

    /**
     * Delete action in the peer list.
     * Peer is not deleted, but marked as distrusted which disconnects it from the network.
     * @param peer The peer to distrust.
     */
    async function deletePeer(peer: PeeringNodeStatusResponse) {
        await peersService.distrustPeer(peer);
    }

    /**
     * An object with the actions that will have the buttons of the peer list.
     * @type {PeerActions}
     */
    const PEER_ACTIONS: PeerActions = {
        trust: trustPeer,
        edit: () => {},
        delete: deletePeer,
    };

    return (
        <div className="peers">
            <div className="content">
                <div className="row spread">
                    <h2>Peers</h2>
                    <div className="row">
                        <button type="button" onClick={toggleBlindMode} className="peers--icon-button">
                            {blindMode ? <EyeIcon /> : <EyeClosedIcon />}
                        </button>

                        <button type="button" className="add-button" onClick={handleSetDialogState}>
                            Add Peer
                        </button>
                    </div>
                </div>
                <div className="peers-panel">
                    {peersList.length === 0 ? (
                        <p className="margin-t-s">There are no peers.</p>
                    ) : (
                        <PeersList peers={peersList} blindMode={blindMode} peerActions={PEER_ACTIONS} />
                    )}
                </div>
                {dialogState?.dialogType && (
                    <Dialog
                        title={
                            {
                                add: "Add Peer",
                                edit: "Edit Peer",
                                promote: "Promote to Known",
                                delete: "Delete Confirmation",
                            }[dialogState.dialogType] ?? ""
                        }
                        actions={[
                            <button
                                type="button"
                                // onClick={async () => (dialogState?.dialogIsEdit ? peerConfigure() : peerDelete())}
                                key={0}
                                disabled={
                                    dialogState?.dialogBusy ||
                                    (dialogState?.dialogIsEdit &&
                                        (dialogState?.dialogPeerAddress?.trim().length === 0 ||
                                            dialogState?.dialogPeerId?.trim().length === 0))
                                }
                            >
                                {dialogState?.dialogIsEdit ? "OK" : "Yes"}
                            </button>,
                            <button
                                type="button"
                                onClick={() =>
                                    setDialogState({
                                        dialogPeerId: undefined,
                                        dialogPeerIdOriginal: undefined,
                                        dialogType: undefined,
                                    })
                                }
                                key={1}
                                disabled={dialogState?.dialogBusy}
                            >
                                {dialogState?.dialogIsEdit ? "Cancel" : "No"}
                            </button>,
                        ]}
                    >
                        {dialogState?.dialogType === "delete" && (
                            <p className="margin-b-l">Are you sure you want to delete the peer?</p>
                        )}
                        {dialogState?.dialogIsEdit && (
                            <React.Fragment>
                                <p>Please enter the details of the peer to {dialogState?.dialogType}.</p>
                                <div className="dialog--label">Address</div>
                                <div className="dialog--value">
                                    <input
                                        type="text"
                                        className="input--stretch"
                                        placeholder="e.g. /ip4/127.0.0.1/tcp/15600"
                                        value={dialogState?.dialogPeerAddress}
                                        disabled={dialogState?.dialogBusy}
                                        onChange={(e) => setDialogState({ dialogPeerAddress: e.target.value })}
                                    />
                                </div>
                                <div className="dialog--label">Id</div>
                                <div className="dialog--value">
                                    <input
                                        type="text"
                                        className="input--stretch"
                                        placeholder="e.g. 12D3KooWC7uE9w3RN4Vh1FJAZa8SbE8yMWR6wCVBajcWpyWguV73"
                                        value={dialogState?.dialogPeerId}
                                        disabled={dialogState?.dialogBusy}
                                        onChange={(e) => setDialogState({ dialogPeerId: e.target.value })}
                                    />
                                </div>
                                <div className="dialog--label">Alias</div>
                                <div className="dialog--value">
                                    <input
                                        type="text"
                                        className="input--stretch"
                                        placeholder="e.g. My Friend's Node"
                                        value={dialogState?.dialogPeerAlias}
                                        disabled={dialogState?.dialogBusy}
                                        onChange={(e) => setDialogState({ dialogPeerAlias: e.target.value })}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                        {dialogState?.dialogBusy && <Spinner />}
                        <p className={classNames("margin-t-l", { danger: !dialogState?.dialogBusy })}>
                            {dialogState?.dialogStatus}
                        </p>
                    </Dialog>
                )}
            </div>
        </div>
    );
};
export default Peers;
