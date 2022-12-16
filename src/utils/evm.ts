import { Environment } from "../environment";

/**
 *
 * @param chainID
 */
export function formatEVMJSONRPCUrl(chainID: string) {
    return `${Environment.WaspApiUrl}:9090/chain/${chainID}/evm/jsonrpc`;
}
