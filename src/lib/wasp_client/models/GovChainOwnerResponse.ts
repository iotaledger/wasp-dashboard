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
 * @interface GovChainOwnerResponse
 */
export interface GovChainOwnerResponse {
    /**
     * The chain owner (Bech32-encoded)
     * @type {string}
     * @memberof GovChainOwnerResponse
     */
    chainOwner?: string;
}

/**
 * Check if a given object implements the GovChainOwnerResponse interface.
 */
export function instanceOfGovChainOwnerResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GovChainOwnerResponseFromJSON(json: any): GovChainOwnerResponse {
    return GovChainOwnerResponseFromJSONTyped(json, false);
}

export function GovChainOwnerResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GovChainOwnerResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'chainOwner': !exists(json, 'chainOwner') ? undefined : json['chainOwner'],
    };
}

export function GovChainOwnerResponseToJSON(value?: GovChainOwnerResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'chainOwner': value.chainOwner,
    };
}

