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
 * @interface BlobValueResponse
 */
export interface BlobValueResponse {
    /**
     * 
     * @type {string}
     * @memberof BlobValueResponse
     */
    valueData?: string;
}

/**
 * Check if a given object implements the BlobValueResponse interface.
 */
export function instanceOfBlobValueResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BlobValueResponseFromJSON(json: any): BlobValueResponse {
    return BlobValueResponseFromJSONTyped(json, false);
}

export function BlobValueResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlobValueResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'valueData': !exists(json, 'ValueData') ? undefined : json['ValueData'],
    };
}

export function BlobValueResponseToJSON(value?: BlobValueResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ValueData': value.valueData,
    };
}

