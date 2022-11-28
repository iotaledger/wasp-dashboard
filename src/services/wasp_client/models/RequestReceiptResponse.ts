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
 * @interface RequestReceiptResponse
 */
export interface RequestReceiptResponse {
    /**
     * 
     * @type {string}
     * @memberof RequestReceiptResponse
     */
    receipt?: string;
}

/**
 * Check if a given object implements the RequestReceiptResponse interface.
 */
export function instanceOfRequestReceiptResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RequestReceiptResponseFromJSON(json: any): RequestReceiptResponse {
    return RequestReceiptResponseFromJSONTyped(json, false);
}

export function RequestReceiptResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestReceiptResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'receipt': !exists(json, 'Receipt') ? undefined : json['Receipt'],
    };
}

export function RequestReceiptResponseToJSON(value?: RequestReceiptResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Receipt': value.receipt,
    };
}

