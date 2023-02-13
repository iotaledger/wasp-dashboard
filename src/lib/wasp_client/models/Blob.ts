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
 * @interface Blob
 */
export interface Blob {
    /**
     * 
     * @type {string}
     * @memberof Blob
     */
    hash: string;
    /**
     * 
     * @type {number}
     * @memberof Blob
     */
    size: number;
}

/**
 * Check if a given object implements the Blob interface.
 */
export function instanceOfBlob(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "hash" in value;
    isInstance = isInstance && "size" in value;

    return isInstance;
}

export function BlobFromJSON(json: any): Blob {
    return BlobFromJSONTyped(json, false);
}

export function BlobFromJSONTyped(json: any, ignoreDiscriminator: boolean): Blob {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'hash': json['hash'],
        'size': json['size'],
    };
}

export function BlobToJSON(value?: Blob | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'hash': value.hash,
        'size': value.size,
    };
}

