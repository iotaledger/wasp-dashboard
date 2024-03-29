/* tslint:disable */
/* eslint-disable */
/**
 * Wasp API
 * REST API for the Wasp node
 *
 * The version of the OpenAPI document: 0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { CommitteeNode } from './CommitteeNode';
import {
    CommitteeNodeFromJSON,
    CommitteeNodeFromJSONTyped,
    CommitteeNodeToJSON,
} from './CommitteeNode';

/**
 * 
 * @export
 * @interface CommitteeInfoResponse
 */
export interface CommitteeInfoResponse {
    /**
     * A list of all access nodes and their peering info.
     * @type {Array<CommitteeNode>}
     * @memberof CommitteeInfoResponse
     */
    accessNodes: Array<CommitteeNode>;
    /**
     * Whether or not the chain is active.
     * @type {boolean}
     * @memberof CommitteeInfoResponse
     */
    active: boolean;
    /**
     * A list of all candidate nodes and their peering info.
     * @type {Array<CommitteeNode>}
     * @memberof CommitteeInfoResponse
     */
    candidateNodes: Array<CommitteeNode>;
    /**
     * ChainID (Bech32-encoded).
     * @type {string}
     * @memberof CommitteeInfoResponse
     */
    chainId: string;
    /**
     * A list of all committee nodes and their peering info.
     * @type {Array<CommitteeNode>}
     * @memberof CommitteeInfoResponse
     */
    committeeNodes: Array<CommitteeNode>;
    /**
     * 
     * @type {string}
     * @memberof CommitteeInfoResponse
     */
    stateAddress: string;
}

/**
 * Check if a given object implements the CommitteeInfoResponse interface.
 */
export function instanceOfCommitteeInfoResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "accessNodes" in value;
    isInstance = isInstance && "active" in value;
    isInstance = isInstance && "candidateNodes" in value;
    isInstance = isInstance && "chainId" in value;
    isInstance = isInstance && "committeeNodes" in value;
    isInstance = isInstance && "stateAddress" in value;

    return isInstance;
}

export function CommitteeInfoResponseFromJSON(json: any): CommitteeInfoResponse {
    return CommitteeInfoResponseFromJSONTyped(json, false);
}

export function CommitteeInfoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommitteeInfoResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accessNodes': ((json['accessNodes'] as Array<any>).map(CommitteeNodeFromJSON)),
        'active': json['active'],
        'candidateNodes': ((json['candidateNodes'] as Array<any>).map(CommitteeNodeFromJSON)),
        'chainId': json['chainId'],
        'committeeNodes': ((json['committeeNodes'] as Array<any>).map(CommitteeNodeFromJSON)),
        'stateAddress': json['stateAddress'],
    };
}

export function CommitteeInfoResponseToJSON(value?: CommitteeInfoResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'accessNodes': ((value.accessNodes as Array<any>).map(CommitteeNodeToJSON)),
        'active': value.active,
        'candidateNodes': ((value.candidateNodes as Array<any>).map(CommitteeNodeToJSON)),
        'chainId': value.chainId,
        'committeeNodes': ((value.committeeNodes as Array<any>).map(CommitteeNodeToJSON)),
        'stateAddress': value.stateAddress,
    };
}

