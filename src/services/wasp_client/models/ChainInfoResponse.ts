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
import type { GasFeePolicy } from './GasFeePolicy';
import {
    GasFeePolicyFromJSON,
    GasFeePolicyFromJSONTyped,
    GasFeePolicyToJSON,
} from './GasFeePolicy';

/**
 * 
 * @export
 * @interface ChainInfoResponse
 */
export interface ChainInfoResponse {
    /**
     * ChainID (bech32-encoded).
     * @type {string}
     * @memberof ChainInfoResponse
     */
    chainID?: string;
    /**
     * The chain owner address (bech32-encoded).
     * @type {string}
     * @memberof ChainInfoResponse
     */
    chainOwnerID?: string;
    /**
     * The description of the chain.
     * @type {string}
     * @memberof ChainInfoResponse
     */
    description?: string;
    /**
     * The EVM chain ID
     * @type {number}
     * @memberof ChainInfoResponse
     */
    eVMChainID?: number;
    /**
     * 
     * @type {GasFeePolicy}
     * @memberof ChainInfoResponse
     */
    gasFeePolicy?: GasFeePolicy;
    /**
     * Whether or not the chain is active.
     * @type {boolean}
     * @memberof ChainInfoResponse
     */
    isActive?: boolean;
    /**
     * The maximum contract blob size.
     * @type {number}
     * @memberof ChainInfoResponse
     */
    maxBlobSize?: number;
    /**
     * The maximum event size.
     * @type {number}
     * @memberof ChainInfoResponse
     */
    maxEventSize?: number;
    /**
     * The maximum amount of events per request.
     * @type {number}
     * @memberof ChainInfoResponse
     */
    maxEventsPerReq?: number;
}

/**
 * Check if a given object implements the ChainInfoResponse interface.
 */
export function instanceOfChainInfoResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ChainInfoResponseFromJSON(json: any): ChainInfoResponse {
    return ChainInfoResponseFromJSONTyped(json, false);
}

export function ChainInfoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChainInfoResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'chainID': !exists(json, 'ChainID') ? undefined : json['ChainID'],
        'chainOwnerID': !exists(json, 'ChainOwnerID') ? undefined : json['ChainOwnerID'],
        'description': !exists(json, 'Description') ? undefined : json['Description'],
        'eVMChainID': !exists(json, 'EVMChainID') ? undefined : json['EVMChainID'],
        'gasFeePolicy': !exists(json, 'GasFeePolicy') ? undefined : GasFeePolicyFromJSON(json['GasFeePolicy']),
        'isActive': !exists(json, 'IsActive') ? undefined : json['IsActive'],
        'maxBlobSize': !exists(json, 'MaxBlobSize') ? undefined : json['MaxBlobSize'],
        'maxEventSize': !exists(json, 'MaxEventSize') ? undefined : json['MaxEventSize'],
        'maxEventsPerReq': !exists(json, 'MaxEventsPerReq') ? undefined : json['MaxEventsPerReq'],
    };
}

export function ChainInfoResponseToJSON(value?: ChainInfoResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ChainID': value.chainID,
        'ChainOwnerID': value.chainOwnerID,
        'Description': value.description,
        'EVMChainID': value.eVMChainID,
        'GasFeePolicy': GasFeePolicyToJSON(value.gasFeePolicy),
        'IsActive': value.isActive,
        'MaxBlobSize': value.maxBlobSize,
        'MaxEventSize': value.maxEventSize,
        'MaxEventsPerReq': value.maxEventsPerReq,
    };
}
