import "./Peers.scss";

import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { EyeClosedIcon, EyeIcon } from "../../assets";
import { ServiceFactory } from "../../factories/serviceFactory";
import { EventAggregator } from "../../services/eventAggregator";
import { PeersService } from "../../services/peersService";
import { SettingsService } from "../../services/settingsService";
import { TangleService } from "../../services/tangleService";
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
     * Add a new peer.
     */
    async function peerConfigure(): Promise<void> {
        setDialogState({
            dialogBusy: true,
            dialogStatus:
                dialogState?.dialogType === "add" ? "Adding peer, please wait..." : "Promoting peer, please wait...",
        });
        await (async () => {
            const tangleService = ServiceFactory.get<TangleService>("tangle");

            try {
                if (dialogState?.dialogType === "edit" && dialogState?.dialogPeerIdOriginal) {
                    await tangleService.peerDelete(dialogState?.dialogPeerIdOriginal);
                }
                let addr = dialogState?.dialogPeerAddress;
                if (addr === undefined || !dialogState?.dialogPeerAlias) {
                    return;
                }
                if (!addr?.endsWith("/")) {
                    addr += "/";
                }
                addr += `p2p/${dialogState?.dialogPeerId}`;
                await tangleService.peerAdd(addr, dialogState.dialogPeerAlias);

                setDialogState({
                    dialogBusy: false,
                    dialogStatus: "",
                    dialogPeerId: undefined,
                    dialogType: undefined,
                });
            } catch (error) {
                if (error instanceof Error) {
                    setDialogState({
                        dialogBusy: false,
                        dialogStatus: `Failed to ${dialogState?.dialogType} peer: ${error.message}`,
                    });
                }
            }
        })();
    }

    /**
     * Delete the specified peer.
     */
    async function peerDelete(): Promise<void> {
        setDialogState({
            dialogBusy: true,
            dialogStatus: "Deleting peer, please wait...",
        });
        await (async () => {
            if (dialogState?.dialogPeerId) {
                const tangleService = ServiceFactory.get<TangleService>("tangle");

                try {
                    await tangleService.peerDelete(dialogState?.dialogPeerId);

                    setDialogState({
                        dialogBusy: false,
                        dialogStatus: "",
                        dialogPeerId: undefined,
                        dialogType: undefined,
                    });
                } catch (error) {
                    if (error instanceof Error) {
                        setDialogState({
                            dialogBusy: false,
                            dialogStatus: `Failed to delete peer: ${error.message}`,
                        });
                    }
                }
            }
        })();
    }

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
                    {!peersList ? (
                        <p className="margin-t-s">There are no peers.</p>
                    ) : (
                        <PeersList peers={peersList} blindMode={blindMode} detailedList />
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
                                onClick={async () => (dialogState?.dialogIsEdit ? peerConfigure() : peerDelete())}
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
