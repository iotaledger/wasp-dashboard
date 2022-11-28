/* tslint:disable */
/* eslint-disable */
/**
 * Wasp API
 * REST API for the Wasp node
 *
 * The version of the OpenAPI document: 0.3.8
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
    accessNodes?: Array<CommitteeNode>;
    /**
     * Whether or not the chain is active.
     * @type {boolean}
     * @memberof CommitteeInfoResponse
     */
    active?: boolean;
    /**
     * A list of all candidate nodes and their peering info.
     * @type {Array<CommitteeNode>}
     * @memberof CommitteeInfoResponse
     */
    candidateNodes?: Array<CommitteeNode>;
    /**
     * ChainID (bech32-encoded).
     * @type {string}
     * @memberof CommitteeInfoResponse
     */
    chainID?: string;
    /**
     * A list of all committee nodes and their peering info.
     * @type {Array<CommitteeNode>}
     * @memberof CommitteeInfoResponse
     */
    committeeNodes?: Array<CommitteeNode>;
    /**
     * 
     * @type {string}
     * @memberof CommitteeInfoResponse
     */
    stateAddress?: string;
}

/**
 * Check if a given object implements the CommitteeInfoResponse interface.
 */
export function instanceOfCommitteeInfoResponse(value: object): boolean {
    let isInstance = true;

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
        
        'accessNodes': !exists(json, 'AccessNodes') ? undefined : ((json['AccessNodes'] as Array<any>).map(CommitteeNodeFromJSON)),
        'active': !exists(json, 'Active') ? undefined : json['Active'],
        'candidateNodes': !exists(json, 'CandidateNodes') ? undefined : ((json['CandidateNodes'] as Array<any>).map(CommitteeNodeFromJSON)),
        'chainID': !exists(json, 'ChainID') ? undefined : json['ChainID'],
        'committeeNodes': !exists(json, 'CommitteeNodes') ? undefined : ((json['CommitteeNodes'] as Array<any>).map(CommitteeNodeFromJSON)),
        'stateAddress': !exists(json, 'StateAddress') ? undefined : json['StateAddress'],
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
        
        'AccessNodes': value.accessNodes === undefined ? undefined : ((value.accessNodes as Array<any>).map(CommitteeNodeToJSON)),
        'Active': value.active,
        'CandidateNodes': value.candidateNodes === undefined ? undefined : ((value.candidateNodes as Array<any>).map(CommitteeNodeToJSON)),
        'ChainID': value.chainID,
        'CommitteeNodes': value.committeeNodes === undefined ? undefined : ((value.committeeNodes as Array<any>).map(CommitteeNodeToJSON)),
        'StateAddress': value.stateAddress,
    };
}

