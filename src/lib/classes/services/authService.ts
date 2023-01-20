import { Environment } from "../../../environment";
import { ServiceFactory, WaspClientService } from "../../classes";
import { decodeJWTPayload } from "../../utils/jwt";
import { FetchHelper } from "../helpers";
import { EventAggregator } from "./eventAggregator";
import { LocalStorageService } from "./localStorageService";

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

    /**
     * Initialise service.
     */
    public async initialize(): Promise<void> {
        const jwt = this._storageService.load<string>("dashboard-jwt");
        this._jwt = jwt;
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
            EventAggregator.publish("auth-state", false);
        }
    }

    /**
     * Get the jwt.
     * @returns The jwt if logged in.
     */
    public isLoggedIn(): string | undefined {
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
        const jwt = this.isLoggedIn();
        if (jwt) {
            headers.Authorization = `Bearer ${jwt}`;
        }
        const csrf = this.csrf();
        if (csrf) {
            headers["X-CSRF-Token"] = csrf;
        }

        return headers;
    }
}
