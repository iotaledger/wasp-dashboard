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
import type { BlockReceiptError } from './BlockReceiptError';
import {
    BlockReceiptErrorFromJSON,
    BlockReceiptErrorFromJSONTyped,
    BlockReceiptErrorToJSON,
} from './BlockReceiptError';
import type { BurnLog } from './BurnLog';
import {
    BurnLogFromJSON,
    BurnLogFromJSONTyped,
    BurnLogToJSON,
} from './BurnLog';
import type { RequestDetail } from './RequestDetail';
import {
    RequestDetailFromJSON,
    RequestDetailFromJSONTyped,
    RequestDetailToJSON,
} from './RequestDetail';

/**
 * 
 * @export
 * @interface RequestReceiptResponse
 */
export interface RequestReceiptResponse {
    /**
     * 
     * @type {number}
     * @memberof RequestReceiptResponse
     */
    blockIndex?: number;
    /**
     * 
     * @type {BlockReceiptError}
     * @memberof RequestReceiptResponse
     */
    error?: BlockReceiptError;
    /**
     * 
     * @type {number}
     * @memberof RequestReceiptResponse
     */
    gasBudget?: number;
    /**
     * 
     * @type {BurnLog}
     * @memberof RequestReceiptResponse
     */
    gasBurnLog?: BurnLog;
    /**
     * 
     * @type {number}
     * @memberof RequestReceiptResponse
     */
    gasBurned?: number;
    /**
     * 
     * @type {number}
     * @memberof RequestReceiptResponse
     */
    gasFeeCharged?: number;
    /**
     * 
     * @type {RequestDetail}
     * @memberof RequestReceiptResponse
     */
    request?: RequestDetail;
    /**
     * 
     * @type {number}
     * @memberof RequestReceiptResponse
     */
    requestIndex?: number;
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
        
        'blockIndex': !exists(json, 'blockIndex') ? undefined : json['blockIndex'],
        'error': !exists(json, 'error') ? undefined : BlockReceiptErrorFromJSON(json['error']),
        'gasBudget': !exists(json, 'gasBudget') ? undefined : json['gasBudget'],
        'gasBurnLog': !exists(json, 'gasBurnLog') ? undefined : BurnLogFromJSON(json['gasBurnLog']),
        'gasBurned': !exists(json, 'gasBurned') ? undefined : json['gasBurned'],
        'gasFeeCharged': !exists(json, 'gasFeeCharged') ? undefined : json['gasFeeCharged'],
        'request': !exists(json, 'request') ? undefined : RequestDetailFromJSON(json['request']),
        'requestIndex': !exists(json, 'requestIndex') ? undefined : json['requestIndex'],
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
        
        'blockIndex': value.blockIndex,
        'error': BlockReceiptErrorToJSON(value.error),
        'gasBudget': value.gasBudget,
        'gasBurnLog': BurnLogToJSON(value.gasBurnLog),
        'gasBurned': value.gasBurned,
        'gasFeeCharged': value.gasFeeCharged,
        'request': RequestDetailToJSON(value.request),
        'requestIndex': value.requestIndex,
    };
}

