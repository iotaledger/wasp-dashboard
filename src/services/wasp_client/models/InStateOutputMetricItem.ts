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
import type { InStateOutput } from './InStateOutput';
import {
    InStateOutputFromJSON,
    InStateOutputFromJSONTyped,
    InStateOutputToJSON,
} from './InStateOutput';

/**
 * 
 * @export
 * @interface InStateOutputMetricItem
 */
export interface InStateOutputMetricItem {
    /**
     * 
     * @type {InStateOutput}
     * @memberof InStateOutputMetricItem
     */
    lastMessage?: InStateOutput;
    /**
     * 
     * @type {number}
     * @memberof InStateOutputMetricItem
     */
    messages?: number;
    /**
     * 
     * @type {Date}
     * @memberof InStateOutputMetricItem
     */
    timestamp?: Date;
}

/**
 * Check if a given object implements the InStateOutputMetricItem interface.
 */
export function instanceOfInStateOutputMetricItem(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function InStateOutputMetricItemFromJSON(json: any): InStateOutputMetricItem {
    return InStateOutputMetricItemFromJSONTyped(json, false);
}

export function InStateOutputMetricItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): InStateOutputMetricItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lastMessage': !exists(json, 'LastMessage') ? undefined : InStateOutputFromJSON(json['LastMessage']),
        'messages': !exists(json, 'Messages') ? undefined : json['Messages'],
        'timestamp': !exists(json, 'Timestamp') ? undefined : (new Date(json['Timestamp'])),
    };
}

export function InStateOutputMetricItemToJSON(value?: InStateOutputMetricItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'LastMessage': InStateOutputToJSON(value.lastMessage),
        'Messages': value.messages,
        'Timestamp': value.timestamp === undefined ? undefined : (value.timestamp.toISOString()),
    };
}

