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
 * @interface MilestoneInfo
 */
export interface MilestoneInfo {
    /**
     * 
     * @type {number}
     * @memberof MilestoneInfo
     */
    index?: number;
    /**
     * 
     * @type {string}
     * @memberof MilestoneInfo
     */
    milestoneId?: string;
    /**
     * 
     * @type {number}
     * @memberof MilestoneInfo
     */
    timestamp?: number;
}

/**
 * Check if a given object implements the MilestoneInfo interface.
 */
export function instanceOfMilestoneInfo(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MilestoneInfoFromJSON(json: any): MilestoneInfo {
    return MilestoneInfoFromJSONTyped(json, false);
}

export function MilestoneInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MilestoneInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'index': !exists(json, 'index') ? undefined : json['index'],
        'milestoneId': !exists(json, 'milestoneId') ? undefined : json['milestoneId'],
        'timestamp': !exists(json, 'timestamp') ? undefined : json['timestamp'],
    };
}

export function MilestoneInfoToJSON(value?: MilestoneInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'index': value.index,
        'milestoneId': value.milestoneId,
        'timestamp': value.timestamp,
    };
}
