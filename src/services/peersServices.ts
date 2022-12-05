import { ServiceFactory } from "../factories/serviceFactory";
import { AuthService } from "./authService";
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
     * Poll Timeout Id
     */
    private _peerPollId: NodeJS.Timeout | undefined;

    /**
     * Method to initialize the poll.
     */
    public initialize(): void {
        const authService = ServiceFactory.get<AuthService>("auth");

        if (authService.isLoggedIn()) {
            // eslint-disable-next-line no-void
            void this.fetchPeers();
            this.start();
        }
        EventAggregator.subscribe("auth-state", "peersService", (isLoggedIn) => {
            if (isLoggedIn) {
                this.start();
            } else {
                this.stop();
            }
        });
    }

    /**
     * Method to stop the poll.
     */
    public stop(): void {
        clearInterval(this._peerPollId);
    }

    /**
     * Method to start the poll.
     */
    public start(): void {
        this._peerPollId = setInterval(this.fetchPeers, 15000);
    }

    /**
     * Get the perrs.
     * @returns Array of peers.
     */
    public get: () => PeeringNodeStatusResponse[] = () => this._peers;

    /**
     * Fetch the peers.
     * @returns {Promise<PeeringNodeStatusResponse[]>} An array of peers.
     */
    private readonly fetchPeers = async (): Promise<void> => {
        const waspClientService: WaspClientService = ServiceFactory.get<WaspClientService>("wasp-client");
        const peers = await waspClientService.node().getAllPeers();
        EventAggregator.publish("peers-state", peers);
        this._peers = peers;
    };
}
