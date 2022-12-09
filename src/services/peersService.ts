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
    public async trustPeer(peer: PeeringNodeStatusResponse): Promise<void> {
        try {
            const waspAPI: WaspClientService = ServiceFactory.get<WaspClientService>("wasp-client");
            const reqParams = { body: { publicKey: peer.publicKey, netID: peer.netID } };
            const { raw } = await waspAPI.node().trustPeerRaw(reqParams);
            if (raw.status !== 200) {
                throw new Error("Failed to trust peer");
            }

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
    public async distrustPeer(peer: PeeringNodeStatusResponse): Promise<void> {
        try {
            const waspClientService = ServiceFactory.get<WaspClientService>("wasp-client");
            const reqParams = { body: { publicKey: peer.publicKey, netID: peer.netID } };
            const { raw } = await waspClientService.node().distrustPeerRaw(reqParams);
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
        const waspClientService: WaspClientService = ServiceFactory.get<WaspClientService>("wasp-client");
        const peers = await waspClientService.node().getAllPeers();
        EventAggregator.publish("peers-state", peers);
        this._peers = peers;
    };
}
