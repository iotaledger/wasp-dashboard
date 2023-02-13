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
import type { InOutput } from './InOutput';
import {
    InOutputFromJSON,
    InOutputFromJSONTyped,
    InOutputToJSON,
} from './InOutput';

/**
 * 
 * @export
 * @interface InOutputMetricItem
 */
export interface InOutputMetricItem {
    /**
     * 
     * @type {InOutput}
     * @memberof InOutputMetricItem
     */
    lastMessage: InOutput;
    /**
     * 
     * @type {number}
     * @memberof InOutputMetricItem
     */
    messages: number;
    /**
     * 
     * @type {Date}
     * @memberof InOutputMetricItem
     */
    timestamp: Date;
}

/**
 * Check if a given object implements the InOutputMetricItem interface.
 */
export function instanceOfInOutputMetricItem(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "lastMessage" in value;
    isInstance = isInstance && "messages" in value;
    isInstance = isInstance && "timestamp" in value;

    return isInstance;
}

export function InOutputMetricItemFromJSON(json: any): InOutputMetricItem {
    return InOutputMetricItemFromJSONTyped(json, false);
}

export function InOutputMetricItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): InOutputMetricItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lastMessage': InOutputFromJSON(json['lastMessage']),
        'messages': json['messages'],
        'timestamp': (new Date(json['timestamp'])),
    };
}

export function InOutputMetricItemToJSON(value?: InOutputMetricItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lastMessage': InOutputToJSON(value.lastMessage),
        'messages': value.messages,
        'timestamp': (value.timestamp.toISOString()),
    };
}

