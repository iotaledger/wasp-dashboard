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
    lastMessage?: InOutput;
    /**
     * 
     * @type {number}
     * @memberof InOutputMetricItem
     */
    messages?: number;
    /**
     * 
     * @type {Date}
     * @memberof InOutputMetricItem
     */
    timestamp?: Date;
}

/**
 * Check if a given object implements the InOutputMetricItem interface.
 */
export function instanceOfInOutputMetricItem(value: object): boolean {
    let isInstance = true;

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
        
        'lastMessage': !exists(json, 'lastMessage') ? undefined : InOutputFromJSON(json['lastMessage']),
        'messages': !exists(json, 'messages') ? undefined : json['messages'],
        'timestamp': !exists(json, 'timestamp') ? undefined : (new Date(json['timestamp'])),
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
        'timestamp': value.timestamp === undefined ? undefined : (value.timestamp.toISOString()),
    };
}
