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
 * @interface RentStructure
 */
export interface RentStructure {
    /**
     * The virtual byte cost
     * @type {number}
     * @memberof RentStructure
     */
    vByteCost: number;
    /**
     * The virtual byte factor for data fields
     * @type {number}
     * @memberof RentStructure
     */
    vByteFactorData: number;
    /**
     * The virtual byte factor for key/lookup generating fields
     * @type {number}
     * @memberof RentStructure
     */
    vByteFactorKey: number;
}

/**
 * Check if a given object implements the RentStructure interface.
 */
export function instanceOfRentStructure(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "vByteCost" in value;
    isInstance = isInstance && "vByteFactorData" in value;
    isInstance = isInstance && "vByteFactorKey" in value;

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
        
        'vByteCost': json['vByteCost'],
        'vByteFactorData': json['vByteFactorData'],
        'vByteFactorKey': json['vByteFactorKey'],
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
        
        'vByteCost': value.vByteCost,
        'vByteFactorData': value.vByteFactorData,
        'vByteFactorKey': value.vByteFactorKey,
    };
}

