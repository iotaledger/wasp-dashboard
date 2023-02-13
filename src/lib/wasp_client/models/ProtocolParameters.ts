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
     * The human readable network prefix
     * @type {string}
     * @memberof ProtocolParameters
     */
    bech32Hrp: string;
    /**
     * The networks max depth
     * @type {number}
     * @memberof ProtocolParameters
     */
    belowMaxDepth: number;
    /**
     * The minimal PoW score
     * @type {number}
     * @memberof ProtocolParameters
     */
    minPowScore: number;
    /**
     * The network name
     * @type {string}
     * @memberof ProtocolParameters
     */
    networkName: string;
    /**
     * 
     * @type {RentStructure}
     * @memberof ProtocolParameters
     */
    rentStructure: RentStructure;
    /**
     * The token supply
     * @type {string}
     * @memberof ProtocolParameters
     */
    tokenSupply: string;
    /**
     * The protocol version
     * @type {number}
     * @memberof ProtocolParameters
     */
    version: number;
}

/**
 * Check if a given object implements the ProtocolParameters interface.
 */
export function instanceOfProtocolParameters(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "bech32Hrp" in value;
    isInstance = isInstance && "belowMaxDepth" in value;
    isInstance = isInstance && "minPowScore" in value;
    isInstance = isInstance && "networkName" in value;
    isInstance = isInstance && "rentStructure" in value;
    isInstance = isInstance && "tokenSupply" in value;
    isInstance = isInstance && "version" in value;

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
        
        'bech32Hrp': json['bech32Hrp'],
        'belowMaxDepth': json['belowMaxDepth'],
        'minPowScore': json['minPowScore'],
        'networkName': json['networkName'],
        'rentStructure': RentStructureFromJSON(json['rentStructure']),
        'tokenSupply': json['tokenSupply'],
        'version': json['version'],
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
        
        'bech32Hrp': value.bech32Hrp,
        'belowMaxDepth': value.belowMaxDepth,
        'minPowScore': value.minPowScore,
        'networkName': value.networkName,
        'rentStructure': RentStructureToJSON(value.rentStructure),
        'tokenSupply': value.tokenSupply,
        'version': value.version,
    };
}

