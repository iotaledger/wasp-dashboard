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
/**
 * 
 * @export
 * @interface DKSharesPostRequest
 */
export interface DKSharesPostRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof DKSharesPostRequest
     */
    peerIdentities: Array<string>;
    /**
     * Should be =< len(PeerPublicIdentities)
     * @type {number}
     * @memberof DKSharesPostRequest
     */
    threshold: number;
    /**
     * Timeout in milliseconds.
     * @type {number}
     * @memberof DKSharesPostRequest
     */
    timeoutMS: number;
}

/**
 * Check if a given object implements the DKSharesPostRequest interface.
 */
export function instanceOfDKSharesPostRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "peerIdentities" in value;
    isInstance = isInstance && "threshold" in value;
    isInstance = isInstance && "timeoutMS" in value;

    return isInstance;
}

export function DKSharesPostRequestFromJSON(json: any): DKSharesPostRequest {
    return DKSharesPostRequestFromJSONTyped(json, false);
}

export function DKSharesPostRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): DKSharesPostRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'peerIdentities': json['peerIdentities'],
        'threshold': json['threshold'],
        'timeoutMS': json['timeoutMS'],
    };
}

export function DKSharesPostRequestToJSON(value?: DKSharesPostRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'peerIdentities': value.peerIdentities,
        'threshold': value.threshold,
        'timeoutMS': value.timeoutMS,
    };
}

