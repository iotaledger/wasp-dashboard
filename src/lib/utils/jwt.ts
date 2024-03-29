/**
 * Decode a JWT token payload.
 * @param token The given JWT token.
 * @returns The decoded payload of the given JWT.
 */
export function decodeJWTPayload<T = string | number>(token: string): Record<string, T> {
    const jwt = token.replace("Bearer", "").trim();
    const [header, payload, signature] = jwt.split(".");
    if (header.length !== 36 || signature.length !== 43) {
        throw new Error("Malformed JWT");
    }
    const decodedPayload = window.atob(payload);
    const parsedPayload = JSON.parse(decodedPayload) as Record<string, T>;
    return parsedPayload;
}

/**
 * Decode jwt to get expiry time.
 * @param token The jwt.
 * @returns The expiry time.
 */
export function getTokenExpiry(token: string) {
    const { exp } = decodeJWTPayload(token);
    const expiryTimestamp = (exp as number) * 1000;
    return expiryTimestamp;
}
