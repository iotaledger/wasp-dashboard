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
 * @interface PeeringNodeStatus
 */
export interface PeeringNodeStatus {
    /**
     * 
     * @type {boolean}
     * @memberof PeeringNodeStatus
     */
    isAlive?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PeeringNodeStatus
     */
    netID?: string;
    /**
     * 
     * @type {number}
     * @memberof PeeringNodeStatus
     */
    numUsers?: number;
    /**
     * 
     * @type {string}
     * @memberof PeeringNodeStatus
     */
    pubKey?: string;
}

/**
 * Check if a given object implements the PeeringNodeStatus interface.
 */
export function instanceOfPeeringNodeStatus(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PeeringNodeStatusFromJSON(json: any): PeeringNodeStatus {
    return PeeringNodeStatusFromJSONTyped(json, false);
}

export function PeeringNodeStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): PeeringNodeStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isAlive': !exists(json, 'IsAlive') ? undefined : json['IsAlive'],
        'netID': !exists(json, 'NetID') ? undefined : json['NetID'],
        'numUsers': !exists(json, 'NumUsers') ? undefined : json['NumUsers'],
        'pubKey': !exists(json, 'PubKey') ? undefined : json['PubKey'],
    };
}

export function PeeringNodeStatusToJSON(value?: PeeringNodeStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'IsAlive': value.isAlive,
        'NetID': value.netID,
        'NumUsers': value.numUsers,
        'PubKey': value.pubKey,
    };
}

