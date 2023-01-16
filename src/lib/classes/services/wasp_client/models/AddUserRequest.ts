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
 * @interface AddUserRequest
 */
export interface AddUserRequest {
    /**
     * 
     * @type {string}
     * @memberof AddUserRequest
     */
    password?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AddUserRequest
     */
    permissions?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof AddUserRequest
     */
    username?: string;
}

/**
 * Check if a given object implements the AddUserRequest interface.
 */
export function instanceOfAddUserRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AddUserRequestFromJSON(json: any): AddUserRequest {
    return AddUserRequestFromJSONTyped(json, false);
}

export function AddUserRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddUserRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'password': !exists(json, 'password') ? undefined : json['password'],
        'permissions': !exists(json, 'permissions') ? undefined : json['permissions'],
        'username': !exists(json, 'username') ? undefined : json['username'],
    };
}

export function AddUserRequestToJSON(value?: AddUserRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'password': value.password,
        'permissions': value.permissions,
        'username': value.username,
    };
}

