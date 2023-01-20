import { Environment } from "../../environment";

/**
 * Format the EVM JSON RPC URL.
 * @param chainID The chain ID.
 * @returns The formatted URL.
 */
export function formatEVMJSONRPCUrl(chainID: string): string {
    return `${Environment.WaspApiUrl}/chain/${chainID}/evm/jsonrpc`;
}