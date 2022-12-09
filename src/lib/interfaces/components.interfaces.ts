import { PeeringNodeStatusResponse } from "../../services/wasp_client";

export interface PeerActions {
    trust: (peer: PeeringNodeStatusResponse) => void;
    delete: (peer: PeeringNodeStatusResponse) => void;
    edit: (peer: PeeringNodeStatusResponse) => void;
}
