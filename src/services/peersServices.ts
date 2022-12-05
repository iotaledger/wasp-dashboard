import { ServiceFactory } from "../factories/serviceFactory";
import { EventAggregator } from "./eventAggregator";
import { PeeringNodeStatusResponse } from "./wasp_client";
import { WaspClientService } from "./waspClientService";

/**
 * Class to manage peers.
 */
export class PeersService {
    /**
     * The peers.
     * @type {PeeringNodeStatusResponse[]}
     */
    private _peers: PeeringNodeStatusResponse[] = [];

    /**
     * Pool Timeout Id
     */
    private _peerPoolId: NodeJS.Timeout | undefined;

    /**
     * Method to initialize the pool.
     */
    public initialize(): void {
        this._peers = [];
        this.initializePool();
    }

    /**
     * Fetch the peers.
     * @returns {Promise<PeeringNodeStatusResponse[]>} An array of peers.
     */
    public fetchPeers: () => Promise<PeeringNodeStatusResponse[]> = async (): Promise<PeeringNodeStatusResponse[]> => {
        const waspClientService: WaspClientService = ServiceFactory.get<WaspClientService>("wasp-client");
        const peers = await waspClientService.node().getAllPeers();
        EventAggregator.publish("peers-state", peers);
        this._peers = peers;
        return peers;
    };

    /**
     * Method to stop the pool.
     */
    public stopPool(): void {
        clearInterval(this._peerPoolId);
    }

    /**
     * Get the perrs.
     * @returns Array of peers.
     */
    public get: () => PeeringNodeStatusResponse[] = () => this._peers;

    /**
     * Start the pool to fetch every 15s.
     */
    private initializePool(): void {
        this._peerPoolId = setInterval(this.fetchPeers, 15000);
    }
}
