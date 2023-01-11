import { IOutputResponse, OutputTypes } from "@iota/iota.js";
import { AssociationType } from "../enums";

export interface IAssociatedOutput {
    association?: AssociationType;
    outputId: string;
    outputDetails?: IOutputResponse;
    outputType?: OutputTypes;
}

export interface IAssociatedOutputsResponse {
    /**
     * The associated outputs.
     */
    outputs?: IAssociatedOutput[];
}
