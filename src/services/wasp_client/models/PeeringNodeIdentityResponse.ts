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
/**
 * 
 * @export
 * @interface PeeringNodeIdentityResponse
 */
export interface PeeringNodeIdentityResponse {
    /**
     * 
     * @type {boolean}
     * @memberof PeeringNodeIdentityResponse
     */
    isTrusted?: boolean;
    /**
     * The NetID of the peer
     * @type {string}
     * @memberof PeeringNodeIdentityResponse
     */
    netID?: string;
    /**
     * The peers public key encoded in hex
     * @type {string}
     * @memberof PeeringNodeIdentityResponse
     */
    publicKey?: string;
}

/**
 * Check if a given object implements the PeeringNodeIdentityResponse interface.
 */
export function instanceOfPeeringNodeIdentityResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PeeringNodeIdentityResponseFromJSON(json: any): PeeringNodeIdentityResponse {
    return PeeringNodeIdentityResponseFromJSONTyped(json, false);
}

export function PeeringNodeIdentityResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PeeringNodeIdentityResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isTrusted': !exists(json, 'IsTrusted') ? undefined : json['IsTrusted'],
        'netID': !exists(json, 'NetID') ? undefined : json['NetID'],
        'publicKey': !exists(json, 'PublicKey') ? undefined : json['PublicKey'],
    };
}

export function PeeringNodeIdentityResponseToJSON(value?: PeeringNodeIdentityResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'IsTrusted': value.isTrusted,
        'NetID': value.netID,
        'PublicKey': value.publicKey,
    };
}
