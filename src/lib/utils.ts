/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { SetStateAction } from "react";
import zxcvbn from "zxcvbn";
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

/**
 * @param password The password to check.
 * @returns The password strength feedback.
 */
export function checkPasswordStrength(password: string): SetStateAction<string | null> {
    const passwordStrength = zxcvbn(password);
    if (password !== "" && passwordStrength.score < 2) {
        return passwordStrength.feedback.suggestions.join(" ");
    }
    return null;
}
