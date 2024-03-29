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
 * @interface BaseToken
 */
export interface BaseToken {
    /**
     * The token decimals
     * @type {number}
     * @memberof BaseToken
     */
    decimals: number;
    /**
     * The base token name
     * @type {string}
     * @memberof BaseToken
     */
    name: string;
    /**
     * The token subunit
     * @type {string}
     * @memberof BaseToken
     */
    subunit: string;
    /**
     * The ticker symbol
     * @type {string}
     * @memberof BaseToken
     */
    tickerSymbol: string;
    /**
     * The token unit
     * @type {string}
     * @memberof BaseToken
     */
    unit: string;
    /**
     * Whether or not the token uses a metric prefix
     * @type {boolean}
     * @memberof BaseToken
     */
    useMetricPrefix: boolean;
}

/**
 * Check if a given object implements the BaseToken interface.
 */
export function instanceOfBaseToken(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "decimals" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "subunit" in value;
    isInstance = isInstance && "tickerSymbol" in value;
    isInstance = isInstance && "unit" in value;
    isInstance = isInstance && "useMetricPrefix" in value;

    return isInstance;
}

export function BaseTokenFromJSON(json: any): BaseToken {
    return BaseTokenFromJSONTyped(json, false);
}

export function BaseTokenFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseToken {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'decimals': json['decimals'],
        'name': json['name'],
        'subunit': json['subunit'],
        'tickerSymbol': json['tickerSymbol'],
        'unit': json['unit'],
        'useMetricPrefix': json['useMetricPrefix'],
    };
}

export function BaseTokenToJSON(value?: BaseToken | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'decimals': value.decimals,
        'name': value.name,
        'subunit': value.subunit,
        'tickerSymbol': value.tickerSymbol,
        'unit': value.unit,
        'useMetricPrefix': value.useMetricPrefix,
    };
}

