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
 * @interface BlockReceiptError
 */
export interface BlockReceiptError {
    /**
     * 
     * @type {string}
     * @memberof BlockReceiptError
     */
    errorMessage?: string;
    /**
     * 
     * @type {string}
     * @memberof BlockReceiptError
     */
    hash?: string;
}

/**
 * Check if a given object implements the BlockReceiptError interface.
 */
export function instanceOfBlockReceiptError(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BlockReceiptErrorFromJSON(json: any): BlockReceiptError {
    return BlockReceiptErrorFromJSONTyped(json, false);
}

export function BlockReceiptErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockReceiptError {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'errorMessage': !exists(json, 'errorMessage') ? undefined : json['errorMessage'],
        'hash': !exists(json, 'hash') ? undefined : json['hash'],
    };
}

export function BlockReceiptErrorToJSON(value?: BlockReceiptError | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'errorMessage': value.errorMessage,
        'hash': value.hash,
    };
}

