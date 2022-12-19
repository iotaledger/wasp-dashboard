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
import type { Allowance } from './Allowance';
import {
    AllowanceFromJSON,
    AllowanceFromJSONTyped,
    AllowanceToJSON,
} from './Allowance';
import type { CallTarget } from './CallTarget';
import {
    CallTargetFromJSON,
    CallTargetFromJSONTyped,
    CallTargetToJSON,
} from './CallTarget';
import type { FungibleTokens } from './FungibleTokens';
import {
    FungibleTokensFromJSON,
    FungibleTokensFromJSONTyped,
    FungibleTokensToJSON,
} from './FungibleTokens';
import type { JSONDict } from './JSONDict';
import {
    JSONDictFromJSON,
    JSONDictFromJSONTyped,
    JSONDictToJSON,
} from './JSONDict';
import type { NFTDataResponse } from './NFTDataResponse';
import {
    NFTDataResponseFromJSON,
    NFTDataResponseFromJSONTyped,
    NFTDataResponseToJSON,
} from './NFTDataResponse';

/**
 * 
 * @export
 * @interface RequestDetail
 */
export interface RequestDetail {
    /**
     * 
     * @type {Allowance}
     * @memberof RequestDetail
     */
    allowance?: Allowance;
    /**
     * 
     * @type {CallTarget}
     * @memberof RequestDetail
     */
    callTarget?: CallTarget;
    /**
     * 
     * @type {FungibleTokens}
     * @memberof RequestDetail
     */
    fungibleTokens?: FungibleTokens;
    /**
     * 
     * @type {number}
     * @memberof RequestDetail
     */
    gasGudget?: number;
    /**
     * 
     * @type {boolean}
     * @memberof RequestDetail
     */
    isEVM?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof RequestDetail
     */
    isOffLedger?: boolean;
    /**
     * 
     * @type {NFTDataResponse}
     * @memberof RequestDetail
     */
    nFT?: NFTDataResponse;
    /**
     * 
     * @type {JSONDict}
     * @memberof RequestDetail
     */
    params?: JSONDict;
    /**
     * 
     * @type {string}
     * @memberof RequestDetail
     */
    requestID?: string;
    /**
     * 
     * @type {string}
     * @memberof RequestDetail
     */
    senderAccount?: string;
    /**
     * 
     * @type {string}
     * @memberof RequestDetail
     */
    targetAddress?: string;
}

/**
 * Check if a given object implements the RequestDetail interface.
 */
export function instanceOfRequestDetail(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RequestDetailFromJSON(json: any): RequestDetail {
    return RequestDetailFromJSONTyped(json, false);
}

export function RequestDetailFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestDetail {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'allowance': !exists(json, 'Allowance') ? undefined : AllowanceFromJSON(json['Allowance']),
        'callTarget': !exists(json, 'CallTarget') ? undefined : CallTargetFromJSON(json['CallTarget']),
        'fungibleTokens': !exists(json, 'FungibleTokens') ? undefined : FungibleTokensFromJSON(json['FungibleTokens']),
        'gasGudget': !exists(json, 'GasGudget') ? undefined : json['GasGudget'],
        'isEVM': !exists(json, 'IsEVM') ? undefined : json['IsEVM'],
        'isOffLedger': !exists(json, 'IsOffLedger') ? undefined : json['IsOffLedger'],
        'nFT': !exists(json, 'NFT') ? undefined : NFTDataResponseFromJSON(json['NFT']),
        'params': !exists(json, 'Params') ? undefined : JSONDictFromJSON(json['Params']),
        'requestID': !exists(json, 'RequestID') ? undefined : json['RequestID'],
        'senderAccount': !exists(json, 'SenderAccount') ? undefined : json['SenderAccount'],
        'targetAddress': !exists(json, 'TargetAddress') ? undefined : json['TargetAddress'],
    };
}

export function RequestDetailToJSON(value?: RequestDetail | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Allowance': AllowanceToJSON(value.allowance),
        'CallTarget': CallTargetToJSON(value.callTarget),
        'FungibleTokens': FungibleTokensToJSON(value.fungibleTokens),
        'GasGudget': value.gasGudget,
        'IsEVM': value.isEVM,
        'IsOffLedger': value.isOffLedger,
        'NFT': NFTDataResponseToJSON(value.nFT),
        'Params': JSONDictToJSON(value.params),
        'RequestID': value.requestID,
        'SenderAccount': value.senderAccount,
        'TargetAddress': value.targetAddress,
    };
}

