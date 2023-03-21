import { Environment } from "../../environment";

/**
 * Check if the Node API is up and running
 */
export async function isNodeOnline(): Promise<boolean> {
    try {
        if (Environment.WaspApiUrl.startsWith("##WASP")) {
            return false;
        }
        const res = await fetch(`${Environment.WaspApiUrl}/v1/node/version`);
        return res.status === 200;
    } catch {
        return false;
    }
}
