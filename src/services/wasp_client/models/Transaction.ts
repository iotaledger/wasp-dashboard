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
 * @interface Transaction
 */
export interface Transaction {
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    transactionID?: string;
}

/**
 * Check if a given object implements the Transaction interface.
 */
export function instanceOfTransaction(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TransactionFromJSON(json: any): Transaction {
    return TransactionFromJSONTyped(json, false);
}

export function TransactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Transaction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'transactionID': !exists(json, 'TransactionID') ? undefined : json['TransactionID'],
    };
}

export function TransactionToJSON(value?: Transaction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'TransactionID': value.transactionID,
    };
}

