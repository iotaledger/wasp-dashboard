import { PeeringNodeStatusResponse } from "../../lib";

export interface HomeState {
    /**
     * The version.
     */
    version?: string;

    /**
     * The Public Key.
     */
    publicKey?: string;

    /**
     * The network ID.
     */
    networkId?: string;

    /**
     * Latest version.
     */
    latestVersion?: string;

    /**
     * The version.
     */
    displayVersion?: string;

    /**
     * Latest version.
     */
    displayLatestVersion?: string;

    /**
     * Last received bps time.
     */
    lastReceivedBpsTime: number;

    /**
     * The blocks per second incoming.
     */
    bpsIncoming: number[];

    /**
     * The blocks per second outgoing.
     */
    bpsOutgoing: number[];

    /**
     * The banner logo source.
     */
    bannerSrc: string;

    /**
     *  The list of peers.
     */
    peersList: PeeringNodeStatusResponse[];
}
