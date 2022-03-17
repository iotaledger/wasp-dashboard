import { OutputTypes } from "@iota/iota.js";

export interface OutputState {
    /**
     * Format the amount in full.
     */
    formatFull: boolean;

    /**
     * Is genesis output.
     */
    isGenesis: boolean;

    /**
     * Is genesis output.
     */
    output: OutputTypes;
}
