import moment from "moment";

/**
 *
 * @param date The date to format.
 * @returns The formatted date.
 */
export function formatDate(date?: Date | null): string {
    const year = moment().year();
    const month = moment().month();
    const day = moment().date();
    const hours = moment().hours();
    const minutes = moment().minutes();
    const seconds = moment().seconds();
    const newformattedDate = moment(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

    if (!date || year < 2000) {
        return "-";
    }
    return newformattedDate.format("YYYY-MM-DD HH:mm:ss");
}
