/* tslint:disable */
/* eslint-disable */
/**
 * Wasp API
 * REST API for the Wasp node
 *
 * The version of the OpenAPI document: 123
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { NativeToken } from './NativeToken';
import {
    NativeTokenFromJSON,
    NativeTokenFromJSONTyped,
    NativeTokenToJSON,
} from './NativeToken';

/**
 * 
 * @export
 * @interface FungibleTokens
 */
export interface FungibleTokens {
    /**
     * 
     * @type {number}
     * @memberof FungibleTokens
     */
    baseTokens?: number;
    /**
     * 
     * @type {Array<NativeToken>}
     * @memberof FungibleTokens
     */
    nativeTokens?: Array<NativeToken>;
}

/**
 * Check if a given object implements the FungibleTokens interface.
 */
export function instanceOfFungibleTokens(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FungibleTokensFromJSON(json: any): FungibleTokens {
    return FungibleTokensFromJSONTyped(json, false);
}

export function FungibleTokensFromJSONTyped(json: any, ignoreDiscriminator: boolean): FungibleTokens {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'baseTokens': !exists(json, 'baseTokens') ? undefined : json['baseTokens'],
        'nativeTokens': !exists(json, 'nativeTokens') ? undefined : ((json['nativeTokens'] as Array<any>).map(NativeTokenFromJSON)),
    };
}

export function FungibleTokensToJSON(value?: FungibleTokens | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'baseTokens': value.baseTokens,
        'nativeTokens': value.nativeTokens === undefined ? undefined : ((value.nativeTokens as Array<any>).map(NativeTokenToJSON)),
    };
}

