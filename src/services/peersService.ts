import { ServiceFactory } from "../factories/serviceFactory";
import { AuthService } from "./authService";
import { EventAggregator } from "./eventAggregator";
import { PeeringNodeStatusResponse, PeeringTrustRequest } from "./wasp_client";
import { WaspClientService } from "./waspClientService";

/**
 * Class to manage peers.
 */
export class PeersService {
    public static readonly ServiceName = "PeersService";

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
        const authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);

        if (authService.isLoggedIn()) {
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
        // eslint-disable-next-line no-void
        void this.fetchPeers();
        this._peerPollId = setInterval(this.fetchPeers, 15000);
    }

    /**
     * Get the peers.
     * @returns Array of peers.
     */
    public get: () => PeeringNodeStatusResponse[] = () => this._peers;

    /**
     * Trust a peer and refetch the list of peers.
     * @param peer The peer to trust.
     */
    public async trustPeer(peer: PeeringTrustRequest): Promise<void> {
        try {
            const waspAPI: WaspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
            await waspAPI.node().trustPeer({ peeringTrustRequest: peer });

            // refetch peers because the api response returns void.
            await this.fetchPeers();
        } catch (err) {
            if (err instanceof Error) {
                console.error(`Failed to trust peer: ${err.message}`);
            }
        }
    }

    /**
     * Distrust a peer and refetch the list of peers.
     * Note: This action will remove the peer from the list of peers.
     * @param peer The peer to distrust.
     */
    public async distrustPeer(peer: PeeringTrustRequest): Promise<void> {
        try {
            const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
            const { raw } = await waspClientService.node().distrustPeerRaw({ peeringTrustRequest: peer });
            if (raw.status !== 200) {
                throw new Error("Failed to distrust peer");
            }
            await this.fetchPeers();
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
        }
    }

    /**
     * Fetch the peers.
     */
    private readonly fetchPeers = async (): Promise<void> => {
        // eslint-disable-next-line max-len
        const waspClientService: WaspClientService = ServiceFactory.get<WaspClientService>(
            WaspClientService.ServiceName
        );
        const peers = await waspClientService.node().getTrustedPeers();
        EventAggregator.publish("peers-state", peers);
        this._peers = peers;
    };
}
