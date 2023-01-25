/* tslint:disable */
/* eslint-disable */
/**
 * Wasp API
 * REST API for the Wasp node
 *
 * The version of the OpenAPI document: 123
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
 * @interface AccountNFTsResponse
 */
export interface AccountNFTsResponse {
    /**
     * 
     * @type {Array<string>}
     * @memberof AccountNFTsResponse
     */
    nftIds?: Array<string>;
}

/**
 * Check if a given object implements the AccountNFTsResponse interface.
 */
export function instanceOfAccountNFTsResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AccountNFTsResponseFromJSON(json: any): AccountNFTsResponse {
    return AccountNFTsResponseFromJSONTyped(json, false);
}

export function AccountNFTsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountNFTsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nftIds': !exists(json, 'nftIds') ? undefined : json['nftIds'],
    };
}

export function AccountNFTsResponseToJSON(value?: AccountNFTsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nftIds': value.nftIds,
    };
}

