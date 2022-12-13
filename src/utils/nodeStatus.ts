import { Environment } from "../environment";

const EXPECTED_RESPONSE = { Error: "code=404, message=Not Found" };

/**
 * Check if the Node API is up and running
 */
export default async function isNodeOnline(): Promise<boolean> {
    try {
        const res = await fetch(Environment.WaspApiUrl);
        const data = await res.json();
        return JSON.stringify(data) === JSON.stringify(EXPECTED_RESPONSE);
    } catch {
        return false;
    }
}
