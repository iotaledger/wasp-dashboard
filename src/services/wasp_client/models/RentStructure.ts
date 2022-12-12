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
 * @interface RentStructure
 */
export interface RentStructure {
    /**
     * 
     * @type {number}
     * @memberof RentStructure
     */
    vBFactorData?: number;
    /**
     * 
     * @type {number}
     * @memberof RentStructure
     */
    vBFactorKey?: number;
    /**
     * 
     * @type {number}
     * @memberof RentStructure
     */
    vByteCost?: number;
}

/**
 * Check if a given object implements the RentStructure interface.
 */
export function instanceOfRentStructure(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RentStructureFromJSON(json: any): RentStructure {
    return RentStructureFromJSONTyped(json, false);
}

export function RentStructureFromJSONTyped(json: any, ignoreDiscriminator: boolean): RentStructure {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'vBFactorData': !exists(json, 'VBFactorData') ? undefined : json['VBFactorData'],
        'vBFactorKey': !exists(json, 'VBFactorKey') ? undefined : json['VBFactorKey'],
        'vByteCost': !exists(json, 'VByteCost') ? undefined : json['VByteCost'],
    };
}

export function RentStructureToJSON(value?: RentStructure | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'VBFactorData': value.vBFactorData,
        'VBFactorKey': value.vBFactorKey,
        'VByteCost': value.vByteCost,
    };
}

