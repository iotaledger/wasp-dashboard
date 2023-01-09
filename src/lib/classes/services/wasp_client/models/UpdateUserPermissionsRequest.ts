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
 * @interface UpdateUserPermissionsRequest
 */
export interface UpdateUserPermissionsRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateUserPermissionsRequest
     */
    permissions?: Array<string>;
}

/**
 * Check if a given object implements the UpdateUserPermissionsRequest interface.
 */
export function instanceOfUpdateUserPermissionsRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateUserPermissionsRequestFromJSON(json: any): UpdateUserPermissionsRequest {
    return UpdateUserPermissionsRequestFromJSONTyped(json, false);
}

export function UpdateUserPermissionsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateUserPermissionsRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'permissions': !exists(json, 'permissions') ? undefined : json['permissions'],
    };
}

export function UpdateUserPermissionsRequestToJSON(value?: UpdateUserPermissionsRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'permissions': value.permissions,
    };
}

