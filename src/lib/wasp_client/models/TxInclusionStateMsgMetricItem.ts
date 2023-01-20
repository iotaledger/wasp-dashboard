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
import type { TxInclusionStateMsg } from './TxInclusionStateMsg';
import {
    TxInclusionStateMsgFromJSON,
    TxInclusionStateMsgFromJSONTyped,
    TxInclusionStateMsgToJSON,
} from './TxInclusionStateMsg';

/**
 * 
 * @export
 * @interface TxInclusionStateMsgMetricItem
 */
export interface TxInclusionStateMsgMetricItem {
    /**
     * 
     * @type {TxInclusionStateMsg}
     * @memberof TxInclusionStateMsgMetricItem
     */
    lastMessage?: TxInclusionStateMsg;
    /**
     * 
     * @type {number}
     * @memberof TxInclusionStateMsgMetricItem
     */
    messages?: number;
    /**
     * 
     * @type {Date}
     * @memberof TxInclusionStateMsgMetricItem
     */
    timestamp?: Date;
}

/**
 * Check if a given object implements the TxInclusionStateMsgMetricItem interface.
 */
export function instanceOfTxInclusionStateMsgMetricItem(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TxInclusionStateMsgMetricItemFromJSON(json: any): TxInclusionStateMsgMetricItem {
    return TxInclusionStateMsgMetricItemFromJSONTyped(json, false);
}

export function TxInclusionStateMsgMetricItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): TxInclusionStateMsgMetricItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lastMessage': !exists(json, 'lastMessage') ? undefined : TxInclusionStateMsgFromJSON(json['lastMessage']),
        'messages': !exists(json, 'messages') ? undefined : json['messages'],
        'timestamp': !exists(json, 'timestamp') ? undefined : (new Date(json['timestamp'])),
    };
}

export function TxInclusionStateMsgMetricItemToJSON(value?: TxInclusionStateMsgMetricItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lastMessage': TxInclusionStateMsgToJSON(value.lastMessage),
        'messages': value.messages,
        'timestamp': value.timestamp === undefined ? undefined : (value.timestamp.toISOString()),
    };
}
