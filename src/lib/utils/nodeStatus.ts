import { Environment } from "../../environment";
import { DOCKER_WASP_API_URL } from "../constants";

/**
 * Check if the Node API is up and running
 */
export async function isNodeOnline(): Promise<boolean> {
    try {
        if (Environment.WaspApiUrl === DOCKER_WASP_API_URL) {
            return false;
        }
        const res = await fetch(`${Environment.WaspApiUrl}/node/version`);
        return res.status === 200;
    } catch {
        return false;
    }
}
