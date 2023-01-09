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
import type { OnLedgerRequest } from './OnLedgerRequest';
import {
    OnLedgerRequestFromJSON,
    OnLedgerRequestFromJSONTyped,
    OnLedgerRequestToJSON,
} from './OnLedgerRequest';

/**
 * 
 * @export
 * @interface OnLedgerRequestMetricItem
 */
export interface OnLedgerRequestMetricItem {
    /**
     * 
     * @type {OnLedgerRequest}
     * @memberof OnLedgerRequestMetricItem
     */
    lastMessage?: OnLedgerRequest;
    /**
     * 
     * @type {number}
     * @memberof OnLedgerRequestMetricItem
     */
    messages?: number;
    /**
     * 
     * @type {Date}
     * @memberof OnLedgerRequestMetricItem
     */
    timestamp?: Date;
}

/**
 * Check if a given object implements the OnLedgerRequestMetricItem interface.
 */
export function instanceOfOnLedgerRequestMetricItem(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function OnLedgerRequestMetricItemFromJSON(json: any): OnLedgerRequestMetricItem {
    return OnLedgerRequestMetricItemFromJSONTyped(json, false);
}

export function OnLedgerRequestMetricItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): OnLedgerRequestMetricItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lastMessage': !exists(json, 'lastMessage') ? undefined : OnLedgerRequestFromJSON(json['lastMessage']),
        'messages': !exists(json, 'messages') ? undefined : json['messages'],
        'timestamp': !exists(json, 'timestamp') ? undefined : (new Date(json['timestamp'])),
    };
}

export function OnLedgerRequestMetricItemToJSON(value?: OnLedgerRequestMetricItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lastMessage': OnLedgerRequestToJSON(value.lastMessage),
        'messages': value.messages,
        'timestamp': value.timestamp === undefined ? undefined : (value.timestamp.toISOString()),
    };
}

