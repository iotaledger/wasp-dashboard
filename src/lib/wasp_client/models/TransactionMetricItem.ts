/* tslint:disable */
/* eslint-disable */
/**
 * Wasp API
 * REST API for the Wasp node
 *
 * The version of the OpenAPI document: 123
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Transaction } from './Transaction';
import {
    TransactionFromJSON,
    TransactionFromJSONTyped,
    TransactionToJSON,
} from './Transaction';

/**
 * 
 * @export
 * @interface TransactionMetricItem
 */
export interface TransactionMetricItem {
    /**
     * 
     * @type {Transaction}
     * @memberof TransactionMetricItem
     */
    lastMessage?: Transaction;
    /**
     * 
     * @type {number}
     * @memberof TransactionMetricItem
     */
    messages?: number;
    /**
     * 
     * @type {Date}
     * @memberof TransactionMetricItem
     */
    timestamp?: Date;
}

/**
 * Check if a given object implements the TransactionMetricItem interface.
 */
export function instanceOfTransactionMetricItem(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TransactionMetricItemFromJSON(json: any): TransactionMetricItem {
    return TransactionMetricItemFromJSONTyped(json, false);
}

export function TransactionMetricItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionMetricItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lastMessage': !exists(json, 'lastMessage') ? undefined : TransactionFromJSON(json['lastMessage']),
        'messages': !exists(json, 'messages') ? undefined : json['messages'],
        'timestamp': !exists(json, 'timestamp') ? undefined : (new Date(json['timestamp'])),
    };
}

export function TransactionMetricItemToJSON(value?: TransactionMetricItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lastMessage': TransactionToJSON(value.lastMessage),
        'messages': value.messages,
        'timestamp': value.timestamp === undefined ? undefined : (value.timestamp.toISOString()),
    };
}

