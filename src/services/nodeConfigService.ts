import { INodeInfoBaseToken } from "@iota/iota.js";
import { ServiceFactory } from "../factories/serviceFactory";
import { SessionStorageService } from "./sessionStorageService";
import { WaspClientService } from "./waspClientService";

/**
 * Service to handle getting confiuration from the node.
 */
export class NodeConfigService {
    /**
     * The network id.
     */
    private _networkId: string;

    /**
     * The version.
     */
    private _version?: string;

    /**
     * The public key.
     */
    private _publicKey?: string;

    /**
     * The base token.
     */
    private readonly _baseToken: INodeInfoBaseToken;

    /**
     * The bech32 hrp.
     */
    private readonly _bech32Hrp: string;

    /**
     * The storage servie.
     */
    private readonly _storageService: SessionStorageService;

    /**
     * Create a new instance of NodeConfigService.
     */
    constructor() {
        this._storageService = ServiceFactory.get<SessionStorageService>("session-storage");
        this._networkId = "";
        this._bech32Hrp = "iota";
        this._baseToken = {
            name: "IOTA",
            tickerSymbol: "MIOTA",
            unit: "i",
            decimals: 0,
            subunit: undefined,
            useMetricPrefix: true,
        };
    }

    /**
     * Initialise NodeConfigService.
     */
    public async initialize(): Promise<void> {
        this._networkId = this._storageService.load<string>("networkId");
        this._publicKey = this._storageService.load<string>("publicKey");
        this._version = this._storageService.load<string>("version");

        if (!this._networkId || !this._version || !this._publicKey) {
            const waspClientService = ServiceFactory.get<WaspClientService>("wasp-client");
            waspClientService.initialize();

            try {
                const info = await waspClientService.node().getInfo();

                if (info.netID) {
                    this.setNetworkId(info.netID);
                }
                if (info.version) {
                    this.setVersion(info.version);
                }
                if (info.publicKey) {
                    this.setPublicKey(info.publicKey);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    /**
     * Get the network id.
     * @returns The network id.
     */
    public getNetworkId(): string {
        return this._networkId;
    }

    /**
     * Get the current version.
     * @returns The current version.
     */
    public getVersion(): string | undefined {
        return this._version;
    }

    /**
     * Get the node base token.
     * @returns The node base token.
     */
    public getBaseToken(): INodeInfoBaseToken {
        return this._baseToken;
    }

    /**
     * Get the hrp for bech32 addresses.
     * @returns The bech32 hrp.
     */
    public getBech32Hrp(): string {
        return this._bech32Hrp;
    }

    /**
     * Get the public key.
     * @returns The public key.
     */
    public getPublicKey(): string | undefined {
        return this._publicKey;
    }

    /**
     * Set the network id.
     * @param networkId The new network id.
     */
    public setNetworkId(networkId: string): void {
        this._networkId = networkId;
        this._storageService.save<string>("networkId", this._networkId);
    }

    /**
     * Set the version.
     * @param version The new version.
     */
    public setVersion(version: string): void {
        this._version = version;
        this._storageService.save<string>("version", this._version);
    }

    /**
     * Set the public key.
     * @param publicKey The new public key.
     */
    public setPublicKey(publicKey: string): void {
        this._publicKey = publicKey;
        this._storageService.save<string>("publicKey", this._publicKey);
    }
}
