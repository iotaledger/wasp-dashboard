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
 * @interface ContractInfoResponse
 */
export interface ContractInfoResponse {
    /**
     * The description of the contract.
     * @type {string}
     * @memberof ContractInfoResponse
     */
    description?: string;
    /**
     * The id (HName(name)) of the contract.
     * @type {number}
     * @memberof ContractInfoResponse
     */
    hName?: number;
    /**
     * The name of the contract.
     * @type {string}
     * @memberof ContractInfoResponse
     */
    name?: string;
    /**
     * The hash of the contract.
     * @type {Array<number>}
     * @memberof ContractInfoResponse
     */
    programHash?: Array<number>;
}

/**
 * Check if a given object implements the ContractInfoResponse interface.
 */
export function instanceOfContractInfoResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ContractInfoResponseFromJSON(json: any): ContractInfoResponse {
    return ContractInfoResponseFromJSONTyped(json, false);
}

export function ContractInfoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ContractInfoResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': !exists(json, 'description') ? undefined : json['description'],
        'hName': !exists(json, 'hName') ? undefined : json['hName'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'programHash': !exists(json, 'programHash') ? undefined : json['programHash'],
    };
}

export function ContractInfoResponseToJSON(value?: ContractInfoResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'hName': value.hName,
        'name': value.name,
        'programHash': value.programHash,
    };
}

