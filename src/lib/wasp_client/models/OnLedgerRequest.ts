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
import type { Output } from './Output';
import {
    OutputFromJSON,
    OutputFromJSONTyped,
    OutputToJSON,
} from './Output';

/**
 * 
 * @export
 * @interface OnLedgerRequest
 */
export interface OnLedgerRequest {
    /**
     * The request ID
     * @type {string}
     * @memberof OnLedgerRequest
     */
    id?: string;
    /**
     * 
     * @type {Output}
     * @memberof OnLedgerRequest
     */
    output?: Output;
    /**
     * The output ID
     * @type {string}
     * @memberof OnLedgerRequest
     */
    outputId?: string;
    /**
     * The raw data of the request (Hex)
     * @type {string}
     * @memberof OnLedgerRequest
     */
    raw?: string;
}

/**
 * Check if a given object implements the OnLedgerRequest interface.
 */
export function instanceOfOnLedgerRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function OnLedgerRequestFromJSON(json: any): OnLedgerRequest {
    return OnLedgerRequestFromJSONTyped(json, false);
}

export function OnLedgerRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): OnLedgerRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'output': !exists(json, 'output') ? undefined : OutputFromJSON(json['output']),
        'outputId': !exists(json, 'outputId') ? undefined : json['outputId'],
        'raw': !exists(json, 'raw') ? undefined : json['raw'],
    };
}

export function OnLedgerRequestToJSON(value?: OnLedgerRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'output': OutputToJSON(value.output),
        'outputId': value.outputId,
        'raw': value.raw,
    };
}
