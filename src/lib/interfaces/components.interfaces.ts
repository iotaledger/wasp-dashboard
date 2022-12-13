import { PeeringNodeStatusResponse } from "../../services/wasp_client";

export interface IDialogState {
    peerAddress: string;
    peerId: string;
    isBusy?: boolean;
}

export interface PeerActions {
    delete: (peer: PeeringNodeStatusResponse) => void;
    edit?: (peer: PeeringNodeStatusResponse) => void;
}
