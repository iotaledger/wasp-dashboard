/* tslint:disable */
/* eslint-disable */
/**
 * Wasp API
 * REST API for the Wasp node
 *
 * The version of the OpenAPI document: 0.4.0-alpha.2
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
 * @interface OffLedgerRequest
 */
export interface OffLedgerRequest {
    /**
     * The chain id
     * @type {string}
     * @memberof OffLedgerRequest
     */
    chainId?: string;
    /**
     * Offledger Request (Hex)
     * @type {string}
     * @memberof OffLedgerRequest
     */
    request?: string;
}

/**
 * Check if a given object implements the OffLedgerRequest interface.
 */
export function instanceOfOffLedgerRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function OffLedgerRequestFromJSON(json: any): OffLedgerRequest {
    return OffLedgerRequestFromJSONTyped(json, false);
}

export function OffLedgerRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): OffLedgerRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'chainId': !exists(json, 'chainId') ? undefined : json['chainId'],
        'request': !exists(json, 'request') ? undefined : json['request'],
    };
}

export function OffLedgerRequestToJSON(value?: OffLedgerRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'chainId': value.chainId,
        'request': value.request,
    };
}
