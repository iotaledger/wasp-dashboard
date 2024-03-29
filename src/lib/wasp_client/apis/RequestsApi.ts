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


import * as runtime from '../runtime';
import type {
  ContractCallViewRequest,
  JSONDict,
  OffLedgerRequest,
  ReceiptResponse,
} from '../models';
import {
    ContractCallViewRequestFromJSON,
    ContractCallViewRequestToJSON,
    JSONDictFromJSON,
    JSONDictToJSON,
    OffLedgerRequestFromJSON,
    OffLedgerRequestToJSON,
    ReceiptResponseFromJSON,
    ReceiptResponseToJSON,
} from '../models';

export interface CallViewRequest {
    contractCallViewRequest: ContractCallViewRequest;
}

export interface GetReceiptRequest {
    chainID: string;
    requestID: string;
}

export interface OffLedgerOperationRequest {
    offLedgerRequest: OffLedgerRequest;
}

export interface WaitForRequestRequest {
    chainID: string;
    requestID: string;
    timeoutSeconds?: number;
}

/**
 * 
 */
export class RequestsApi extends runtime.BaseAPI {

    /**
     * Execute a view call. Either use HName or Name properties. If both are supplied, HName are used.
     * Call a view function on a contract by Hname
     */
    async callViewRaw(requestParameters: CallViewRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<JSONDict>> {
        if (requestParameters.contractCallViewRequest === null || requestParameters.contractCallViewRequest === undefined) {
            throw new runtime.RequiredError('contractCallViewRequest','Required parameter requestParameters.contractCallViewRequest was null or undefined when calling callView.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/requests/callview`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ContractCallViewRequestToJSON(requestParameters.contractCallViewRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => JSONDictFromJSON(jsonValue));
    }

    /**
     * Execute a view call. Either use HName or Name properties. If both are supplied, HName are used.
     * Call a view function on a contract by Hname
     */
    async callView(requestParameters: CallViewRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<JSONDict> {
        const response = await this.callViewRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a receipt from a request ID
     */
    async getReceiptRaw(requestParameters: GetReceiptRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ReceiptResponse>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling getReceipt.');
        }

        if (requestParameters.requestID === null || requestParameters.requestID === undefined) {
            throw new runtime.RequiredError('requestID','Required parameter requestParameters.requestID was null or undefined when calling getReceipt.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/chains/{chainID}/receipts/{requestID}`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))).replace(`{${"requestID"}}`, encodeURIComponent(String(requestParameters.requestID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ReceiptResponseFromJSON(jsonValue));
    }

    /**
     * Get a receipt from a request ID
     */
    async getReceipt(requestParameters: GetReceiptRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ReceiptResponse> {
        const response = await this.getReceiptRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Post an off-ledger request
     */
    async offLedgerRaw(requestParameters: OffLedgerOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.offLedgerRequest === null || requestParameters.offLedgerRequest === undefined) {
            throw new runtime.RequiredError('offLedgerRequest','Required parameter requestParameters.offLedgerRequest was null or undefined when calling offLedger.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/requests/offledger`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OffLedgerRequestToJSON(requestParameters.offLedgerRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Post an off-ledger request
     */
    async offLedger(requestParameters: OffLedgerOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.offLedgerRaw(requestParameters, initOverrides);
    }

    /**
     * Wait until the given request has been processed by the node
     */
    async waitForRequestRaw(requestParameters: WaitForRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ReceiptResponse>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling waitForRequest.');
        }

        if (requestParameters.requestID === null || requestParameters.requestID === undefined) {
            throw new runtime.RequiredError('requestID','Required parameter requestParameters.requestID was null or undefined when calling waitForRequest.');
        }

        const queryParameters: any = {};

        if (requestParameters.timeoutSeconds !== undefined) {
            queryParameters['timeoutSeconds'] = requestParameters.timeoutSeconds;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/chains/{chainID}/requests/{requestID}/wait`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))).replace(`{${"requestID"}}`, encodeURIComponent(String(requestParameters.requestID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ReceiptResponseFromJSON(jsonValue));
    }

    /**
     * Wait until the given request has been processed by the node
     */
    async waitForRequest(requestParameters: WaitForRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ReceiptResponse> {
        const response = await this.waitForRequestRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
