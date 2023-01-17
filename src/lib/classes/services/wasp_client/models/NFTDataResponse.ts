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
 * @interface NFTDataResponse
 */
export interface NFTDataResponse {
    /**
     * 
     * @type {string}
     * @memberof NFTDataResponse
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof NFTDataResponse
     */
    issuer?: string;
    /**
     * 
     * @type {string}
     * @memberof NFTDataResponse
     */
    metadata?: string;
    /**
     * 
     * @type {string}
     * @memberof NFTDataResponse
     */
    owner?: string;
}

/**
 * Check if a given object implements the NFTDataResponse interface.
 */
export function instanceOfNFTDataResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function NFTDataResponseFromJSON(json: any): NFTDataResponse {
    return NFTDataResponseFromJSONTyped(json, false);
}

export function NFTDataResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): NFTDataResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'issuer': !exists(json, 'issuer') ? undefined : json['issuer'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'owner': !exists(json, 'owner') ? undefined : json['owner'],
    };
}

export function NFTDataResponseToJSON(value?: NFTDataResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'issuer': value.issuer,
        'metadata': value.metadata,
        'owner': value.owner,
    };
}

