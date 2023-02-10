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
/**
 * 
 * @export
 * @interface StateTransaction
 */
export interface StateTransaction {
    /**
     * The state index
     * @type {number}
     * @memberof StateTransaction
     */
    stateIndex: number;
    /**
     * The transaction ID
     * @type {string}
     * @memberof StateTransaction
     */
    txId: string;
}

/**
 * Check if a given object implements the StateTransaction interface.
 */
export function instanceOfStateTransaction(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "stateIndex" in value;
    isInstance = isInstance && "txId" in value;

    return isInstance;
}

export function StateTransactionFromJSON(json: any): StateTransaction {
    return StateTransactionFromJSONTyped(json, false);
}

export function StateTransactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): StateTransaction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'stateIndex': json['stateIndex'],
        'txId': json['txId'],
    };
}

export function StateTransactionToJSON(value?: StateTransaction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'stateIndex': value.stateIndex,
        'txId': value.txId,
    };
}
