import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Environment } from "../../../environment";
import { ServiceFactory, WaspClientService } from "../../classes";
import { decodeJWTPayload, getTokenExpiry } from "../../utils/jwt";
import { FetchHelper } from "../helpers";
import { EventAggregator } from "./eventAggregator";
import { LocalStorageService } from "./localStorageService";

dayjs.extend(isBetween);

/**
 * Service to handle authentication.
 */
export class AuthService {
    public static readonly ServiceName = "AuthService";

    /**
     * The client service.
     */
    private readonly _waspClientService: WaspClientService;

    /**
     * The storage service.
     */
    private readonly _storageService: LocalStorageService;

    /**
     * The jwt if authenticated.
     */
    private _jwt?: string;

    /**
     * The csrf cookie from the login operation.
     */
    private readonly _csrf?: string;

    /**
     * The token expiry timer.
     */
    private _tokenExpiryTimer?: NodeJS.Timer;

    /**
     * Create a new instance of AuthService.
     */
    constructor() {
        this._jwt = undefined;
        this._waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
        this._storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);

        if (document.cookie) {
            const cookies = document.cookie.split(";");

            const csrf = cookies.find(c => c.trim().startsWith("_csrf"));

            if (csrf) {
                const parts = csrf.split("=");
                if (parts.length === 2) {
                    this._csrf = parts[1];
                }
            }
        }
    }

    public async getAuthRequired(): Promise<boolean> {
        const response = await FetchHelper.json<
            null,
            {
                scheme?: string;
            }
        >(Environment.WaspApiUrl, "/auth/info", "get");

        if (response.scheme === "jwt") {
            return true;
        }

        return false;
    }

    public isAuthRequired(): boolean {
        return this._storageService.load<boolean>("dashboard-auth-required");
    }

    /**
     * Initialise service.
     */
    public async initialize(): Promise<void> {
        const jwt = this._storageService.load<string>("dashboard-jwt");
        this._jwt = jwt;

        const isAuthRequired = await this.getAuthRequired().catch(() => false);
        this._storageService.save<boolean>("dashboard-auth-required", isAuthRequired);

        if (isAuthRequired) {
            if (await this.isJWTValid()) {
                this.validateTokenPeriodically();
            } else {
                this.logout();
            }
        } else {
            EventAggregator.publish("auth-state", true);
        }
    }

    /**
     * Clear token expiry interval.
     */
    public clearTokenExpiryInterval() {
        if (this._tokenExpiryTimer !== undefined) {
            clearInterval(this._tokenExpiryTimer);
            this._tokenExpiryTimer = undefined;
        }
    }

    /**
     * Refresh the token one minute before it expires.
     */
    public validateTokenPeriodically() {
        try {
            this.clearTokenExpiryInterval();
            const jwt = this._storageService.load<string>("dashboard-jwt");
            const expiryTimestamp = getTokenExpiry(jwt);
            const expiryDate = dayjs(expiryTimestamp);
            const refreshTokenDate = dayjs(expiryDate).subtract(1, "minutes");

            this._tokenExpiryTimer = setInterval(async () => {
                const now = dayjs();
                const isExpired = this.isJWTExpired(now, expiryDate);
                const isValid = await this.isJWTValid();
                if (isExpired || !isValid) {
                    this.logout();
                } else if (now.isBetween(refreshTokenDate, expiryDate)) {
                    await this.initialize();
                }
            }, 30000);
        } catch {
            this.logout();
        }
    }

    /**
     * Check if the JWT has expired
     * @param now Current date
     * @param expiryDate Expiry date
     * @returns If the JWT has expired or not
     */
    public isJWTExpired(now: Dayjs, expiryDate: Dayjs): boolean {
        return now.isAfter(expiryDate);
    }

    /**
     * Check if the JWT hasn't been invalidated manually
     */
    public async isJWTValid(): Promise<boolean> {
        const nodeAPI = this._waspClientService.node();
        try {
            await nodeAPI.getInfo();
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Try performing a login.
     * @param username The username to login with.
     * @param password The password to login with.
     * @param jwt The jwt to login with.
     * @returns True if the login was successful.
     */
    public async login(username: string | undefined, password: string | undefined, jwt?: string): Promise<boolean> {
        this.logout();

        try {
            const headers: Record<string, string> = {};
            if (this._csrf) {
                headers["X-CSRF-Token"] = this._csrf;
            }

            const response = await FetchHelper.json<
                {
                    username?: string;
                    password?: string;
                    jwt?: string;
                },
                {
                    jwt?: string;
                }
            >(
                Environment.WaspApiUrl,
                "/auth",
                "post",
                {
                    username,
                    password,
                    jwt,
                },
                headers,
            );

            if (response.jwt) {
                this._jwt = `Bearer ${response.jwt}`;
                this._storageService.save<string>("dashboard-jwt", this._jwt);
                this._waspClientService.initialize();
                this.validateTokenPeriodically();
                EventAggregator.publish("auth-state", true);
            }
        } catch (err) {
            console.error(err);
        }

        return this._jwt !== undefined;
    }

    /**
     * Logout.
     */
    public logout(): void {
        if (this._jwt) {
            this._storageService.remove("dashboard-jwt");
            this._jwt = undefined;
            this._waspClientService.initialize();
            this.clearTokenExpiryInterval();
            EventAggregator.publish("auth-state", false);
        }
    }

    /**
     * Gets the current logged user permissions.
     * @returns A list of permissions.
     */
    public getPermissions(): string[] {
        if (!this.isAuthRequired()) {
            return ["read", "write"];
        }

        if (!this._jwt) {
            return [];
        }
        try {
            const { permissions } = decodeJWTPayload<Record<string, string>>(this._jwt);
            return Object.keys(permissions);
        } catch {
            return [];
        }
    }

    /**
     * Get the jwt.
     * @returns The jwt if logged in.
     */
    public isLoggedIn(): boolean {
        if (this.isAuthRequired() && this._jwt !== undefined) {
            return true;
        }

        if (!this.isAuthRequired()) {
            return true;
        }

        return false;
    }

    public getJWT(): string | undefined {
        return this._jwt;
    }

    /**
     * Get the username.
     * @returns The username if logged in.
     */
    public getUsername(): string | undefined {
        if (!this._jwt) {
            return undefined;
        }
        try {
            const { sub } = decodeJWTPayload(this._jwt);
            return sub as string;
        } catch {
            return undefined;
        }
    }

    /**
     * Get the csrf.
     * @returns The csrf.
     */
    public csrf(): string | undefined {
        return this._csrf;
    }

    /**
     * Build authentication headers.
     * @returns The authentication headers.
     */
    public buildAuthHeaders(): Record<string, string> {
        const headers: Record<string, string> = {};
        const isLoggedIn = this.isLoggedIn();

        if (isLoggedIn) {
            const jwt = this.getJWT();
            if (jwt) {
                headers.Authorization = `Bearer ${jwt}`;
            }
            const csrf = this.csrf();
            if (csrf) {
                headers["X-CSRF-Token"] = csrf;
            }
        }

        return headers;
    }
}
