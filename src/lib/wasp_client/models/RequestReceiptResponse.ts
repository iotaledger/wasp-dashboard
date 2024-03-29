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
    blockIndex: number;
    /**
     * 
     * @type {BlockReceiptError}
     * @memberof RequestReceiptResponse
     */
    error?: BlockReceiptError;
    /**
     * The gas budget (uint64 as string)
     * @type {string}
     * @memberof RequestReceiptResponse
     */
    gasBudget: string;
    /**
     * 
     * @type {BurnLog}
     * @memberof RequestReceiptResponse
     */
    gasBurnLog: BurnLog;
    /**
     * The burned gas (uint64 as string)
     * @type {string}
     * @memberof RequestReceiptResponse
     */
    gasBurned: string;
    /**
     * The charged gas fee (uint64 as string)
     * @type {string}
     * @memberof RequestReceiptResponse
     */
    gasFeeCharged: string;
    /**
     * 
     * @type {RequestDetail}
     * @memberof RequestReceiptResponse
     */
    request: RequestDetail;
    /**
     * 
     * @type {number}
     * @memberof RequestReceiptResponse
     */
    requestIndex: number;
}

/**
 * Check if a given object implements the RequestReceiptResponse interface.
 */
export function instanceOfRequestReceiptResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "blockIndex" in value;
    isInstance = isInstance && "gasBudget" in value;
    isInstance = isInstance && "gasBurnLog" in value;
    isInstance = isInstance && "gasBurned" in value;
    isInstance = isInstance && "gasFeeCharged" in value;
    isInstance = isInstance && "request" in value;
    isInstance = isInstance && "requestIndex" in value;

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
        
        'blockIndex': json['blockIndex'],
        'error': !exists(json, 'error') ? undefined : BlockReceiptErrorFromJSON(json['error']),
        'gasBudget': json['gasBudget'],
        'gasBurnLog': BurnLogFromJSON(json['gasBurnLog']),
        'gasBurned': json['gasBurned'],
        'gasFeeCharged': json['gasFeeCharged'],
        'request': RequestDetailFromJSON(json['request']),
        'requestIndex': json['requestIndex'],
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

