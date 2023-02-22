import PasswordValidator from "password-validator";

const schema = new PasswordValidator();
schema
    .is()
    .min(6)
    .is()
    .max(100)
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .not()
    .spaces()
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]);

/**
 * Validate the given password
 * @param password The password to validate
 * @returns String of errors or nothing
 */
export function validatePassword(password: string): string | undefined {
    const results = schema.validate(password, { details: true }) as { message: string }[];
    if (results.length > 0) {
        return results.map(r => r.message).join(" ");
    }
}
