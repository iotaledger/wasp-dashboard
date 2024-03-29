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
 * @interface StateResponse
 */
export interface StateResponse {
    /**
     * The state of the requested key (Hex-encoded)
     * @type {string}
     * @memberof StateResponse
     */
    state: string;
}

/**
 * Check if a given object implements the StateResponse interface.
 */
export function instanceOfStateResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "state" in value;

    return isInstance;
}

export function StateResponseFromJSON(json: any): StateResponse {
    return StateResponseFromJSONTyped(json, false);
}

export function StateResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): StateResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'state': json['state'],
    };
}

export function StateResponseToJSON(value?: StateResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'state': value.state,
    };
}

