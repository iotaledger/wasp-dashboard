import { PeeringNodeStatusResponse } from "../../services/wasp_client";

export interface PeerActions {
    delete: (peer: PeeringNodeStatusResponse) => void;
    edit?: (peer: PeeringNodeStatusResponse) => void;
}
