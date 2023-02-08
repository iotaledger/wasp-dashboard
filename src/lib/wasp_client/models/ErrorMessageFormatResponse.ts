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
 * @interface ErrorMessageFormatResponse
 */
export interface ErrorMessageFormatResponse {
    /**
     * 
     * @type {string}
     * @memberof ErrorMessageFormatResponse
     */
    messageFormat: string;
}

/**
 * Check if a given object implements the ErrorMessageFormatResponse interface.
 */
export function instanceOfErrorMessageFormatResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "messageFormat" in value;

    return isInstance;
}

export function ErrorMessageFormatResponseFromJSON(json: any): ErrorMessageFormatResponse {
    return ErrorMessageFormatResponseFromJSONTyped(json, false);
}

export function ErrorMessageFormatResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorMessageFormatResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'messageFormat': json['messageFormat'],
    };
}

export function ErrorMessageFormatResponseToJSON(value?: ErrorMessageFormatResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'messageFormat': value.messageFormat,
    };
}

