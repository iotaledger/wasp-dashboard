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
 * @interface AccountFoundriesResponse
 */
export interface AccountFoundriesResponse {
    /**
     * 
     * @type {Array<number>}
     * @memberof AccountFoundriesResponse
     */
    foundrySerialNumbers: Array<number>;
}

/**
 * Check if a given object implements the AccountFoundriesResponse interface.
 */
export function instanceOfAccountFoundriesResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "foundrySerialNumbers" in value;

    return isInstance;
}

export function AccountFoundriesResponseFromJSON(json: any): AccountFoundriesResponse {
    return AccountFoundriesResponseFromJSONTyped(json, false);
}

export function AccountFoundriesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountFoundriesResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'foundrySerialNumbers': json['foundrySerialNumbers'],
    };
}

export function AccountFoundriesResponseToJSON(value?: AccountFoundriesResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'foundrySerialNumbers': value.foundrySerialNumbers,
    };
}

