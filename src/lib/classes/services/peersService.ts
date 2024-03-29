import { AuthService, EventAggregator, WaspClientService, ServiceFactory } from "../../classes";
import { PeeringTrustRequest } from "../../wasp_client";

export interface PeeringNode {
    /**
     * Whether or not the peer is activated
     * @type {boolean}
     * @memberof PeeringNodeStatusResponse
     */
    isAlive?: boolean;
    /**
     * @type {boolean}
     * @memberof PeeringNodeStatusResponse
     */
    isTrusted: boolean;
    /**
     * @type {string}
     * @memberof PeeringNodeStatusResponse
     */
    name: string;
    /**
     * The amount of users attached to the peer
     * @type {number}
     * @memberof PeeringNodeStatusResponse
     */
    numUsers?: number;
    /**
     * The peering URL of the peer
     * @type {string}
     * @memberof PeeringNodeStatusResponse
     */
    peeringURL: string;
    /**
     * The peers public key encoded in Hex
     * @type {string}
     * @memberof PeeringNodeStatusResponse
     */
    publicKey: string;
}

/**
 * Class to manage peers.
 */
export class PeersService {
    public static readonly ServiceName = "PeersService";

    /**
     * The peers.
     * @type {PeeringNode[]}
     */
    private _peers: PeeringNode[] = [];

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
        EventAggregator.subscribe("auth-state", "peersService", isLoggedIn => {
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
    public get: () => PeeringNode[] = () => this._peers;

    /**
     * Trust a peer and refetch the list of peers.
     * @param peer The peer to trust.
     * @returns true if the peer was added.
     */
    public async trustPeer(peer: PeeringTrustRequest): Promise<boolean> {
        try {
            const waspAPI: WaspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
            await waspAPI.node().trustPeer({ peeringTrustRequest: peer });

            // refetch peers because the api response returns void.
            await this.fetchPeers();
            return true;
        } catch (err) {
            if (err instanceof Error) {
                console.error(`Failed to trust peer: ${err.message}`);
            }
            return false;
        }
    }

    /**
     * Distrust a peer and refetch the list of peers.
     * Note: This action will remove the peer from the list of peers.
     * @param peer The peer to distrust.
     * @returns true if the peer was removed.
     */
    public async distrustPeer(peer: PeeringTrustRequest): Promise<boolean> {
        try {
            const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
            await waspClientService.node().distrustPeer({ peeringTrustRequest: peer });
            await this.fetchPeers();
            return true;
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
            return false;
        }
    }

    /**
     * Fetch the peers.
     */
    private readonly fetchPeers = async (): Promise<void> => {
        // eslint-disable-next-line max-len
        const waspClientService: WaspClientService = ServiceFactory.get<WaspClientService>(
            WaspClientService.ServiceName,
        );
        const peers = await waspClientService.node().getTrustedPeers();
        EventAggregator.publish("peers-state", peers);
        this._peers = peers;
    };
}
