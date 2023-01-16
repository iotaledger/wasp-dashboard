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
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    error?: string;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    missingPermission?: string;
}

/**
 * Check if a given object implements the ValidationError interface.
 */
export function instanceOfValidationError(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ValidationErrorFromJSON(json: any): ValidationError {
    return ValidationErrorFromJSONTyped(json, false);
}

export function ValidationErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): ValidationError {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'error': !exists(json, 'Error') ? undefined : json['Error'],
        'missingPermission': !exists(json, 'MissingPermission') ? undefined : json['MissingPermission'],
    };
}

export function ValidationErrorToJSON(value?: ValidationError | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Error': value.error,
        'MissingPermission': value.missingPermission,
    };
}

