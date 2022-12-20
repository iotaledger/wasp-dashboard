/**
 * Decode a JWT token payload.
 * @param token The given JWT token.
 * @returns The decoded payload of the given JWT.
 */
export function decodeJWTPayload(token: string): Record<string, string | number> {
    const jwt = token.replace("Bearer", "").trim();
    const [header, payload, signature] = jwt.split(".");
    if (header.length !== 36 || signature.length !== 43) {
        throw new Error("Malformed JWT");
    }
    const decodedPayload = window.atob(payload);
    const parsedPayload = JSON.parse(decodedPayload) as Record<string, string | number>;
    return parsedPayload;
}
