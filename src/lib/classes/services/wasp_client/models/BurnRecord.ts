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
    code?: number;
    /**
     * 
     * @type {number}
     * @memberof BurnRecord
     */
    gasBurned?: number;
}

/**
 * Check if a given object implements the BurnRecord interface.
 */
export function instanceOfBurnRecord(value: object): boolean {
    let isInstance = true;

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
        
        'code': !exists(json, 'Code') ? undefined : json['Code'],
        'gasBurned': !exists(json, 'GasBurned') ? undefined : json['GasBurned'],
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
        
        'Code': value.code,
        'GasBurned': value.gasBurned,
    };
}

