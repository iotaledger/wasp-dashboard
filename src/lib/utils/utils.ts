/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";

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

export const truncateText = (text: string) => (text.length > 10 ? `${text.slice(0, 4)}...${text.slice(-4)}` : text);

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
