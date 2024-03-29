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
import type { RequestReceiptResponse } from './RequestReceiptResponse';
import {
    RequestReceiptResponseFromJSON,
    RequestReceiptResponseFromJSONTyped,
    RequestReceiptResponseToJSON,
} from './RequestReceiptResponse';

/**
 * 
 * @export
 * @interface BlockReceiptsResponse
 */
export interface BlockReceiptsResponse {
    /**
     * 
     * @type {Array<RequestReceiptResponse>}
     * @memberof BlockReceiptsResponse
     */
    receipts: Array<RequestReceiptResponse>;
}

/**
 * Check if a given object implements the BlockReceiptsResponse interface.
 */
export function instanceOfBlockReceiptsResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "receipts" in value;

    return isInstance;
}

export function BlockReceiptsResponseFromJSON(json: any): BlockReceiptsResponse {
    return BlockReceiptsResponseFromJSONTyped(json, false);
}

export function BlockReceiptsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockReceiptsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'receipts': ((json['receipts'] as Array<any>).map(RequestReceiptResponseFromJSON)),
    };
}

export function BlockReceiptsResponseToJSON(value?: BlockReceiptsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'receipts': ((value.receipts as Array<any>).map(RequestReceiptResponseToJSON)),
    };
}

