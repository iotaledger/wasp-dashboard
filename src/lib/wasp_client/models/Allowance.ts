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
import type { FungibleTokens } from './FungibleTokens';
import {
    FungibleTokensFromJSON,
    FungibleTokensFromJSONTyped,
    FungibleTokensToJSON,
} from './FungibleTokens';

/**
 * 
 * @export
 * @interface Allowance
 */
export interface Allowance {
    /**
     * 
     * @type {FungibleTokens}
     * @memberof Allowance
     */
    fungibleTokens?: FungibleTokens;
    /**
     * 
     * @type {Array<string>}
     * @memberof Allowance
     */
    nfts?: Array<string>;
}

/**
 * Check if a given object implements the Allowance interface.
 */
export function instanceOfAllowance(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AllowanceFromJSON(json: any): Allowance {
    return AllowanceFromJSONTyped(json, false);
}

export function AllowanceFromJSONTyped(json: any, ignoreDiscriminator: boolean): Allowance {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fungibleTokens': !exists(json, 'fungibleTokens') ? undefined : FungibleTokensFromJSON(json['fungibleTokens']),
        'nfts': !exists(json, 'nfts') ? undefined : json['nfts'],
    };
}

export function AllowanceToJSON(value?: Allowance | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'fungibleTokens': FungibleTokensToJSON(value.fungibleTokens),
        'nfts': value.nfts,
    };
}
