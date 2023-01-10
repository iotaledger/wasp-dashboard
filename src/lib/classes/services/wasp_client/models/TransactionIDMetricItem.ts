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
import type { Transaction } from './Transaction';
import {
    TransactionFromJSON,
    TransactionFromJSONTyped,
    TransactionToJSON,
} from './Transaction';

/**
 * 
 * @export
 * @interface TransactionIDMetricItem
 */
export interface TransactionIDMetricItem {
    /**
     * 
     * @type {Transaction}
     * @memberof TransactionIDMetricItem
     */
    lastMessage?: Transaction;
    /**
     * 
     * @type {number}
     * @memberof TransactionIDMetricItem
     */
    messages?: number;
    /**
     * 
     * @type {Date}
     * @memberof TransactionIDMetricItem
     */
    timestamp?: Date;
}

/**
 * Check if a given object implements the TransactionIDMetricItem interface.
 */
export function instanceOfTransactionIDMetricItem(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TransactionIDMetricItemFromJSON(json: any): TransactionIDMetricItem {
    return TransactionIDMetricItemFromJSONTyped(json, false);
}

export function TransactionIDMetricItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionIDMetricItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lastMessage': !exists(json, 'lastMessage') ? undefined : TransactionFromJSON(json['lastMessage']),
        'messages': !exists(json, 'messages') ? undefined : json['messages'],
        'timestamp': !exists(json, 'timestamp') ? undefined : (new Date(json['timestamp'])),
    };
}

export function TransactionIDMetricItemToJSON(value?: TransactionIDMetricItem | null): any {
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

