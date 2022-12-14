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
/**
 * 
 * @export
 * @interface BlockInfoResponse
 */
export interface BlockInfoResponse {
    /**
     * 
     * @type {string}
     * @memberof BlockInfoResponse
     */
    anchorTransactionID?: string;
    /**
     * 
     * @type {number}
     * @memberof BlockInfoResponse
     */
    blockIndex?: number;
    /**
     * 
     * @type {number}
     * @memberof BlockInfoResponse
     */
    gasBurned?: number;
    /**
     * 
     * @type {number}
     * @memberof BlockInfoResponse
     */
    gasFeeCharged?: number;
    /**
     * 
     * @type {string}
     * @memberof BlockInfoResponse
     */
    l1CommitmentHash?: string;
    /**
     * 
     * @type {number}
     * @memberof BlockInfoResponse
     */
    numOffLedgerRequests?: number;
    /**
     * 
     * @type {number}
     * @memberof BlockInfoResponse
     */
    numSuccessfulRequests?: number;
    /**
     * 
     * @type {string}
     * @memberof BlockInfoResponse
     */
    previousL1CommitmentHash?: string;
    /**
     * 
     * @type {Date}
     * @memberof BlockInfoResponse
     */
    timestamp?: Date;
    /**
     * 
     * @type {number}
     * @memberof BlockInfoResponse
     */
    totalBaseTokensInL2Accounts?: number;
    /**
     * 
     * @type {number}
     * @memberof BlockInfoResponse
     */
    totalRequests?: number;
    /**
     * 
     * @type {number}
     * @memberof BlockInfoResponse
     */
    totalStorageDeposit?: number;
    /**
     * 
     * @type {string}
     * @memberof BlockInfoResponse
     */
    transactionSubEssenceHash?: string;
}

/**
 * Check if a given object implements the BlockInfoResponse interface.
 */
export function instanceOfBlockInfoResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BlockInfoResponseFromJSON(json: any): BlockInfoResponse {
    return BlockInfoResponseFromJSONTyped(json, false);
}

export function BlockInfoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockInfoResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'anchorTransactionID': !exists(json, 'AnchorTransactionID') ? undefined : json['AnchorTransactionID'],
        'blockIndex': !exists(json, 'BlockIndex') ? undefined : json['BlockIndex'],
        'gasBurned': !exists(json, 'GasBurned') ? undefined : json['GasBurned'],
        'gasFeeCharged': !exists(json, 'GasFeeCharged') ? undefined : json['GasFeeCharged'],
        'l1CommitmentHash': !exists(json, 'L1CommitmentHash') ? undefined : json['L1CommitmentHash'],
        'numOffLedgerRequests': !exists(json, 'NumOffLedgerRequests') ? undefined : json['NumOffLedgerRequests'],
        'numSuccessfulRequests': !exists(json, 'NumSuccessfulRequests') ? undefined : json['NumSuccessfulRequests'],
        'previousL1CommitmentHash': !exists(json, 'PreviousL1CommitmentHash') ? undefined : json['PreviousL1CommitmentHash'],
        'timestamp': !exists(json, 'Timestamp') ? undefined : (new Date(json['Timestamp'])),
        'totalBaseTokensInL2Accounts': !exists(json, 'TotalBaseTokensInL2Accounts') ? undefined : json['TotalBaseTokensInL2Accounts'],
        'totalRequests': !exists(json, 'TotalRequests') ? undefined : json['TotalRequests'],
        'totalStorageDeposit': !exists(json, 'TotalStorageDeposit') ? undefined : json['TotalStorageDeposit'],
        'transactionSubEssenceHash': !exists(json, 'TransactionSubEssenceHash') ? undefined : json['TransactionSubEssenceHash'],
    };
}

export function BlockInfoResponseToJSON(value?: BlockInfoResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'AnchorTransactionID': value.anchorTransactionID,
        'BlockIndex': value.blockIndex,
        'GasBurned': value.gasBurned,
        'GasFeeCharged': value.gasFeeCharged,
        'L1CommitmentHash': value.l1CommitmentHash,
        'NumOffLedgerRequests': value.numOffLedgerRequests,
        'NumSuccessfulRequests': value.numSuccessfulRequests,
        'PreviousL1CommitmentHash': value.previousL1CommitmentHash,
        'Timestamp': value.timestamp === undefined ? undefined : (value.timestamp.toISOString()),
        'TotalBaseTokensInL2Accounts': value.totalBaseTokensInL2Accounts,
        'TotalRequests': value.totalRequests,
        'TotalStorageDeposit': value.totalStorageDeposit,
        'TransactionSubEssenceHash': value.transactionSubEssenceHash,
    };
}

