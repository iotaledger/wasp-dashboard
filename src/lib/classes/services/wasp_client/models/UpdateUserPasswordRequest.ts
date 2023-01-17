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
/**
 * 
 * @export
 * @interface UpdateUserPasswordRequest
 */
export interface UpdateUserPasswordRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateUserPasswordRequest
     */
    password?: string;
}

/**
 * Check if a given object implements the UpdateUserPasswordRequest interface.
 */
export function instanceOfUpdateUserPasswordRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateUserPasswordRequestFromJSON(json: any): UpdateUserPasswordRequest {
    return UpdateUserPasswordRequestFromJSONTyped(json, false);
}

export function UpdateUserPasswordRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateUserPasswordRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'password': !exists(json, 'password') ? undefined : json['password'],
    };
}

export function UpdateUserPasswordRequestToJSON(value?: UpdateUserPasswordRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'password': value.password,
    };
}

