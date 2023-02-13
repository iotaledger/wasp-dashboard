import { Environment } from "../../environment";

/**
 * Check if the Node API is up and running
 */
export async function isNodeOnline(): Promise<boolean> {
    try {
        const res = await fetch(`${Environment.WaspApiUrl}/node/version`);
        return res.status === 200;
    } catch {
        return false;
    }
}
