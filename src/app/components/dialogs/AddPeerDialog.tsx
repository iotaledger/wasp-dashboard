import React, { useState } from "react";
import { Dialog } from "../";
import { ServiceFactory } from "../../../factories/serviceFactory";
import { PeersService } from "../../../services/peersService";
import { PeeringTrustRequest } from "../../../services/wasp_client";

const FORM_INITIAL_VALUES: IFormValues = {
    publicKey: "",
    netID: "",
};

interface IFormValues {
    publicKey: string;
    netID: string;
}

interface IAddPeerDialog {
    onClose: () => void;
    onSuccess?: () => void;
    onError?: () => void;
}

const AddPeerDialog: React.FC<IAddPeerDialog> = ({ onClose, onSuccess, onError }) => {
    const [formValues, setFormValues] = useState<IFormValues>(FORM_INITIAL_VALUES);
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * The peers service.
     */
    const peersService: PeersService = ServiceFactory.get<PeersService>(PeersService.ServiceName);

    /**
     * Handle add new peer.
     */
    async function handleAddPeer(): Promise<void> {
        setError(null);
        try {
            setIsBusy(true);
            const newPeer: PeeringTrustRequest = {
                publicKey: formValues.publicKey,
                netID: formValues.netID,
            };
            const success = await peersService.trustPeer(newPeer);
            if (!success) {
                throw new Error("Failed to add peer");
            }
            if (onSuccess && typeof onSuccess === "function") {
                onSuccess();
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            if (onError && typeof onError === "function") {
                onError();
            }
        } finally {
            setIsBusy(false);
        }
    }

    /**
     * Handle the change of the input fields.
     * @param e The event.
     */
    function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
    return (
        <Dialog
            onClose={onClose}
            title="Add Peer"
            actions={
                <React.Fragment>
                    <button
                        type="button"
                        className="button button--primary"
                        onClick={handleAddPeer}
                        disabled={isBusy || !formValues.publicKey || !formValues.netID}
                    >
                        Add
                    </button>
                    <button type="button" className="button button--secondary" disabled={isBusy} onClick={onClose}>
                        Cancel
                    </button>
                </React.Fragment>
            }
        >
            <React.Fragment>
                <p>Please enter the details of the peer to add.</p>
                <div className="dialog-content-label">Public key</div>
                <div className="dialog--value">
                    <input
                        type="text"
                        className="input--stretch"
                        placeholder="e.g. 0x0000000000000000000000000000000000000000000000000000000000000000"
                        name="publicKey"
                        value={formValues.publicKey}
                        disabled={isBusy}
                        onChange={onChange}
                    />
                </div>
                <div className="dialog-content-label">Network id</div>
                <div className="dialog--value">
                    <input
                        type="text"
                        className="input--stretch"
                        placeholder="e.g. 127.0.0.1:15600"
                        name="netID"
                        value={formValues.netID}
                        disabled={isBusy}
                        onChange={onChange}
                    />
                    {error && <p className="dialog-content-error">{error}</p>}
                </div>
            </React.Fragment>
        </Dialog>
    );
};
AddPeerDialog.defaultProps = {
    onError: () => {},
    onSuccess: () => {},
};
export default AddPeerDialog;
