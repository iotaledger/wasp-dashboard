/* tslint:disable */
/* eslint-disable */
/**
 * Wasp API
 * REST API for the Wasp node
 *
 * The version of the OpenAPI document: 0.4.0-alpha.1
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
 * @interface OffLedgerRequestBody
 */
export interface OffLedgerRequestBody {
    /**
     * Offledger Request (base64)
     * @type {string}
     * @memberof OffLedgerRequestBody
     */
    request?: string;
}

/**
 * Check if a given object implements the OffLedgerRequestBody interface.
 */
export function instanceOfOffLedgerRequestBody(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function OffLedgerRequestBodyFromJSON(json: any): OffLedgerRequestBody {
    return OffLedgerRequestBodyFromJSONTyped(json, false);
}

export function OffLedgerRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): OffLedgerRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'request': !exists(json, 'request') ? undefined : json['request'],
    };
}

export function OffLedgerRequestBodyToJSON(value?: OffLedgerRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'request': value.request,
    };
}

