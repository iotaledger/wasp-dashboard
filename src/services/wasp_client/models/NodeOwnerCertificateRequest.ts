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
 * @interface NodeOwnerCertificateRequest
 */
export interface NodeOwnerCertificateRequest {
    /**
     * Node pub key. (Hex)
     * @type {string}
     * @memberof NodeOwnerCertificateRequest
     */
    nodePubKey?: string;
    /**
     * Node owner address. (Bech32)
     * @type {string}
     * @memberof NodeOwnerCertificateRequest
     */
    ownerAddress?: string;
}

/**
 * Check if a given object implements the NodeOwnerCertificateRequest interface.
 */
export function instanceOfNodeOwnerCertificateRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function NodeOwnerCertificateRequestFromJSON(json: any): NodeOwnerCertificateRequest {
    return NodeOwnerCertificateRequestFromJSONTyped(json, false);
}

export function NodeOwnerCertificateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): NodeOwnerCertificateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nodePubKey': !exists(json, 'nodePubKey') ? undefined : json['nodePubKey'],
        'ownerAddress': !exists(json, 'ownerAddress') ? undefined : json['ownerAddress'],
    };
}

export function NodeOwnerCertificateRequestToJSON(value?: NodeOwnerCertificateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nodePubKey': value.nodePubKey,
        'ownerAddress': value.ownerAddress,
    };
}

