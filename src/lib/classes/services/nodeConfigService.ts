import { WaspClientService, ServiceFactory } from "../../classes";
import { L1Params } from "../../wasp_client";

/**
 * Service to handle getting confiuration from the node.
 */
export class NodeConfigService {
    public static readonly ServiceName = "NodeConfigService";

    /**
     * The peering url.
     */
    private _peeringUrl: string;

    /**
     * The version.
     */
    private _version?: string;

    /**
     * The public key.
     */
    private _publicKey?: string;

    /**
     * The L1 params.
     */
    private _l1Params?: L1Params;

    /**
     * The bech32 hrp.
     */
    private readonly _bech32Hrp: string;

    /**
     * Create a new instance of NodeConfigService.
     */
    constructor() {
        this._peeringUrl = "";
        this._bech32Hrp = "iota";
    }

    /**
     * Initialise NodeConfigService.
     */
    public async initialize(): Promise<void> {
        if (!this._peeringUrl || !this._version || !this._publicKey || !this._l1Params) {
            const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

            try {
                const info = await waspClientService.node().getInfo();

                if (info.peeringURL) {
                    this.setPeeringUrl(info.peeringURL);
                }
                if (info.version) {
                    this.setVersion(info.version);
                }
                if (info.publicKey) {
                    this.setPublicKey(info.publicKey);
                }
                if (info.l1Params) {
                    this.setL1Params(info.l1Params);
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
    public getPeeringUrl(): string {
        return this._peeringUrl;
    }

    /**
     * Get the current version.
     * @returns The current version.
     */
    public getVersion(): string | undefined {
        return this._version;
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
     * Get the L1 params.
     * @returns The L1 params.
     */
    public getL1Params(): L1Params | undefined {
        return this._l1Params;
    }

    /**
     * Set the network id.
     * @param networkId The new network id.
     */
    public setPeeringUrl(networkId: string): void {
        this._peeringUrl = networkId;
    }

    /**
     * Set the version.
     * @param version The new version.
     */
    public setVersion(version: string): void {
        this._version = version;
    }

    /**
     * Set the public key.
     * @param publicKey The new public key.
     */
    public setPublicKey(publicKey: string): void {
        this._publicKey = publicKey;
    }

    /**
     * Set L1 params.
     * @param params The new L1 params.
     */
    public setL1Params(params: L1Params): void {
        this._l1Params = params;
    }
}
