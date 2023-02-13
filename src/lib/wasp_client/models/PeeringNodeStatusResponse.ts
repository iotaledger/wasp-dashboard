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
 * @interface PeeringNodeStatusResponse
 */
export interface PeeringNodeStatusResponse {
    /**
     * Whether or not the peer is activated
     * @type {boolean}
     * @memberof PeeringNodeStatusResponse
     */
    isAlive: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PeeringNodeStatusResponse
     */
    isTrusted: boolean;
    /**
     * The NetID of the peer
     * @type {string}
     * @memberof PeeringNodeStatusResponse
     */
    netId: string;
    /**
     * The amount of users attached to the peer
     * @type {number}
     * @memberof PeeringNodeStatusResponse
     */
    numUsers: number;
    /**
     * The peers public key encoded in Hex
     * @type {string}
     * @memberof PeeringNodeStatusResponse
     */
    publicKey: string;
}

/**
 * Check if a given object implements the PeeringNodeStatusResponse interface.
 */
export function instanceOfPeeringNodeStatusResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "isAlive" in value;
    isInstance = isInstance && "isTrusted" in value;
    isInstance = isInstance && "netId" in value;
    isInstance = isInstance && "numUsers" in value;
    isInstance = isInstance && "publicKey" in value;

    return isInstance;
}

export function PeeringNodeStatusResponseFromJSON(json: any): PeeringNodeStatusResponse {
    return PeeringNodeStatusResponseFromJSONTyped(json, false);
}

export function PeeringNodeStatusResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PeeringNodeStatusResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isAlive': json['isAlive'],
        'isTrusted': json['isTrusted'],
        'netId': json['netId'],
        'numUsers': json['numUsers'],
        'publicKey': json['publicKey'],
    };
}

export function PeeringNodeStatusResponseToJSON(value?: PeeringNodeStatusResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'isAlive': value.isAlive,
        'isTrusted': value.isTrusted,
        'netId': value.netId,
        'numUsers': value.numUsers,
        'publicKey': value.publicKey,
    };
}

