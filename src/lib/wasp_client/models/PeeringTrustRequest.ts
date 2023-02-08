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
 * @interface PeeringTrustRequest
 */
export interface PeeringTrustRequest {
    /**
     * The NetID of the peer
     * @type {string}
     * @memberof PeeringTrustRequest
     */
    netId: string;
    /**
     * The peers public key encoded in Hex
     * @type {string}
     * @memberof PeeringTrustRequest
     */
    publicKey: string;
}

/**
 * Check if a given object implements the PeeringTrustRequest interface.
 */
export function instanceOfPeeringTrustRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "netId" in value;
    isInstance = isInstance && "publicKey" in value;

    return isInstance;
}

export function PeeringTrustRequestFromJSON(json: any): PeeringTrustRequest {
    return PeeringTrustRequestFromJSONTyped(json, false);
}

export function PeeringTrustRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PeeringTrustRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'netId': json['netId'],
        'publicKey': json['publicKey'],
    };
}

export function PeeringTrustRequestToJSON(value?: PeeringTrustRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'netId': value.netId,
        'publicKey': value.publicKey,
    };
}

