/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import { Environment } from "../../environment";

/**
 *
 * @param date The date to format.
 * @returns The formatted date.
 */
export function formatDate(date?: Date | null): string {
    const year = dayjs(date).year();
    if (!date || year < 2000) {
        return "-";
    }
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

export const copyToClipboard = async (content: string): Promise<void> => navigator?.clipboard?.writeText(content);

export const truncateText = (text: string, charsStart: number = 6, charsEnd: number = 4) =>
    (text.length > charsStart + charsEnd ? `${text.slice(0, charsStart)}...${text.slice(-charsEnd)}` : text);

/**
 *
 * @param url
 * @returns The url with a trailing slash.
 */
export function addTrailingSlash(url: string) {
    if (url.endsWith("/")) {
        return url;
    }
    return `${url}/`;
}

/**
 *
 * @param hash The hash to generate the explorer link for.
 * @returns The link to the explorer.
 */
export function generateExplorerLink(hash: string): string {
    const baseUrl = Environment.ExplorerUrl;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const explorerLink = `${addTrailingSlash(baseUrl)}search/${hash}`;
    return explorerLink;
}
