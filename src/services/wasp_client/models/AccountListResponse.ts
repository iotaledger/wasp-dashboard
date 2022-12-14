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
 * @interface AccountListResponse
 */
export interface AccountListResponse {
    /**
     * 
     * @type {Array<string>}
     * @memberof AccountListResponse
     */
    accounts?: Array<string>;
}

/**
 * Check if a given object implements the AccountListResponse interface.
 */
export function instanceOfAccountListResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AccountListResponseFromJSON(json: any): AccountListResponse {
    return AccountListResponseFromJSONTyped(json, false);
}

export function AccountListResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountListResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accounts': !exists(json, 'Accounts') ? undefined : json['Accounts'],
    };
}

export function AccountListResponseToJSON(value?: AccountListResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Accounts': value.accounts,
    };
}
