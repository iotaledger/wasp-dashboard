/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

/**
 *
 * @param date The date to format.
 * @returns The formatted date.
 */
export function formatDate(date?: Date | null): string {
    if (!date) {
        return "-";
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}
