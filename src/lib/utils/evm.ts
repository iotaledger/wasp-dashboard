import { Environment } from "../../environment";

/**
 * Format the EVM JSON RPC URL.
 * @param chainID The chain ID.
 * @returns The formatted URL.
 */
export function formatEVMJSONRPCUrl(chainID: string): string {
    return `${Environment.WaspApiUrl}/v1/chains/${chainID}/evm`;
}
