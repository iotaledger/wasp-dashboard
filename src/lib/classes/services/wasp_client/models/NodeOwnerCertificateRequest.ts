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
 * @interface NodeOwnerCertificateRequest
 */
export interface NodeOwnerCertificateRequest {
    /**
     * Node owner address. (Bech32)
     * @type {string}
     * @memberof NodeOwnerCertificateRequest
     */
    ownerAddress?: string;
    /**
     * The public key of the node (Hex)
     * @type {string}
     * @memberof NodeOwnerCertificateRequest
     */
    publicKey?: string;
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
        
        'ownerAddress': !exists(json, 'ownerAddress') ? undefined : json['ownerAddress'],
        'publicKey': !exists(json, 'publicKey') ? undefined : json['publicKey'],
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
        
        'ownerAddress': value.ownerAddress,
        'publicKey': value.publicKey,
    };
}

