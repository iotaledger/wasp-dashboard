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
import type { Output } from './Output';
import {
    OutputFromJSON,
    OutputFromJSONTyped,
    OutputToJSON,
} from './Output';

/**
 * 
 * @export
 * @interface AliasOutputMetricItem
 */
export interface AliasOutputMetricItem {
    /**
     * 
     * @type {Output}
     * @memberof AliasOutputMetricItem
     */
    lastMessage?: Output;
    /**
     * 
     * @type {number}
     * @memberof AliasOutputMetricItem
     */
    messages?: number;
    /**
     * 
     * @type {Date}
     * @memberof AliasOutputMetricItem
     */
    timestamp?: Date;
}

/**
 * Check if a given object implements the AliasOutputMetricItem interface.
 */
export function instanceOfAliasOutputMetricItem(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AliasOutputMetricItemFromJSON(json: any): AliasOutputMetricItem {
    return AliasOutputMetricItemFromJSONTyped(json, false);
}

export function AliasOutputMetricItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): AliasOutputMetricItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lastMessage': !exists(json, 'lastMessage') ? undefined : OutputFromJSON(json['lastMessage']),
        'messages': !exists(json, 'messages') ? undefined : json['messages'],
        'timestamp': !exists(json, 'timestamp') ? undefined : (new Date(json['timestamp'])),
    };
}

export function AliasOutputMetricItemToJSON(value?: AliasOutputMetricItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lastMessage': OutputToJSON(value.lastMessage),
        'messages': value.messages,
        'timestamp': value.timestamp === undefined ? undefined : (value.timestamp.toISOString()),
    };
}

