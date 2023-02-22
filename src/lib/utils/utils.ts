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
