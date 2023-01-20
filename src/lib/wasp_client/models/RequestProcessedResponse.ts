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
 * @interface RequestProcessedResponse
 */
export interface RequestProcessedResponse {
    /**
     * 
     * @type {string}
     * @memberof RequestProcessedResponse
     */
    chainId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof RequestProcessedResponse
     */
    isProcessed?: boolean;
    /**
     * 
     * @type {string}
     * @memberof RequestProcessedResponse
     */
    requestId?: string;
}

/**
 * Check if a given object implements the RequestProcessedResponse interface.
 */
export function instanceOfRequestProcessedResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RequestProcessedResponseFromJSON(json: any): RequestProcessedResponse {
    return RequestProcessedResponseFromJSONTyped(json, false);
}

export function RequestProcessedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestProcessedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'chainId': !exists(json, 'chainId') ? undefined : json['chainId'],
        'isProcessed': !exists(json, 'isProcessed') ? undefined : json['isProcessed'],
        'requestId': !exists(json, 'requestId') ? undefined : json['requestId'],
    };
}

export function RequestProcessedResponseToJSON(value?: RequestProcessedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'chainId': value.chainId,
        'isProcessed': value.isProcessed,
        'requestId': value.requestId,
    };
}
