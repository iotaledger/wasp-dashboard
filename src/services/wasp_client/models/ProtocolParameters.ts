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
import type { RentStructure } from './RentStructure';
import {
    RentStructureFromJSON,
    RentStructureFromJSONTyped,
    RentStructureToJSON,
} from './RentStructure';

/**
 * 
 * @export
 * @interface ProtocolParameters
 */
export interface ProtocolParameters {
    /**
     * 
     * @type {string}
     * @memberof ProtocolParameters
     */
    bech32HRP?: string;
    /**
     * 
     * @type {number}
     * @memberof ProtocolParameters
     */
    belowMaxDepth?: number;
    /**
     * 
     * @type {number}
     * @memberof ProtocolParameters
     */
    minPoWScore?: number;
    /**
     * 
     * @type {string}
     * @memberof ProtocolParameters
     */
    networkName?: string;
    /**
     * 
     * @type {RentStructure}
     * @memberof ProtocolParameters
     */
    rentStructure?: RentStructure;
    /**
     * 
     * @type {number}
     * @memberof ProtocolParameters
     */
    tokenSupply?: number;
    /**
     * 
     * @type {number}
     * @memberof ProtocolParameters
     */
    version?: number;
}

/**
 * Check if a given object implements the ProtocolParameters interface.
 */
export function instanceOfProtocolParameters(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ProtocolParametersFromJSON(json: any): ProtocolParameters {
    return ProtocolParametersFromJSONTyped(json, false);
}

export function ProtocolParametersFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProtocolParameters {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'bech32HRP': !exists(json, 'Bech32HRP') ? undefined : json['Bech32HRP'],
        'belowMaxDepth': !exists(json, 'BelowMaxDepth') ? undefined : json['BelowMaxDepth'],
        'minPoWScore': !exists(json, 'MinPoWScore') ? undefined : json['MinPoWScore'],
        'networkName': !exists(json, 'NetworkName') ? undefined : json['NetworkName'],
        'rentStructure': !exists(json, 'RentStructure') ? undefined : RentStructureFromJSON(json['RentStructure']),
        'tokenSupply': !exists(json, 'TokenSupply') ? undefined : json['TokenSupply'],
        'version': !exists(json, 'Version') ? undefined : json['Version'],
    };
}

export function ProtocolParametersToJSON(value?: ProtocolParameters | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Bech32HRP': value.bech32HRP,
        'BelowMaxDepth': value.belowMaxDepth,
        'MinPoWScore': value.minPoWScore,
        'NetworkName': value.networkName,
        'RentStructure': RentStructureToJSON(value.rentStructure),
        'TokenSupply': value.tokenSupply,
        'Version': value.version,
    };
}

