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
 * @interface BurnRecord
 */
export interface BurnRecord {
    /**
     * 
     * @type {number}
     * @memberof BurnRecord
     */
    code: number;
    /**
     * 
     * @type {number}
     * @memberof BurnRecord
     */
    gasBurned: number;
}

/**
 * Check if a given object implements the BurnRecord interface.
 */
export function instanceOfBurnRecord(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "code" in value;
    isInstance = isInstance && "gasBurned" in value;

    return isInstance;
}

export function BurnRecordFromJSON(json: any): BurnRecord {
    return BurnRecordFromJSONTyped(json, false);
}

export function BurnRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): BurnRecord {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': json['code'],
        'gasBurned': json['gasBurned'],
    };
}

export function BurnRecordToJSON(value?: BurnRecord | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'gasBurned': value.gasBurned,
    };
}

