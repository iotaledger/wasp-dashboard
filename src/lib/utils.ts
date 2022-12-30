import moment from "moment";

/**
 *
 * @param date The date to format.
 * @returns The formatted date.
 */
export function formatDate(date?: Date | null): string {
    const year = moment(date).year();
    if (!date || year < 2000) {
        return "-";
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}
