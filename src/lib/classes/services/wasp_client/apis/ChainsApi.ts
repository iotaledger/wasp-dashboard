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


import * as runtime from '../runtime';
import type {
  ChainInfoResponse,
  CommitteeInfoResponse,
  ContractInfoResponse,
  ValidationError,
} from '../models';
import {
    ChainInfoResponseFromJSON,
    ChainInfoResponseToJSON,
    CommitteeInfoResponseFromJSON,
    CommitteeInfoResponseToJSON,
    ContractInfoResponseFromJSON,
    ContractInfoResponseToJSON,
    ValidationErrorFromJSON,
    ValidationErrorToJSON,
} from '../models';

export interface ActivateChainRequest {
    chainID: string;
}

export interface AddAccessNodeRequest {
    chainID: string;
    publicKey: string;
}

export interface AttachToWebsocketRequest {
    chainID: string;
}

export interface DeactivateChainRequest {
    chainID: string;
}

export interface GetChainInfoRequest {
    chainID: string;
}

export interface GetCommitteeInfoRequest {
    chainID: string;
}

export interface GetContractsRequest {
    chainID: string;
}

export interface GetRequestIDFromEVMTransactionIDRequest {
    chainID: string;
    txHash: string;
}

export interface GetStateValueRequest {
    chainID: string;
    stateKey: string;
}

export interface RemoveAccessNodeRequest {
    chainID: string;
    publicKey: string;
}

/**
 * 
 */
export class ChainsApi extends runtime.BaseAPI {

    /**
     * Activate a chain
     */
    async activateChainRaw(requestParameters: ActivateChainRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling activateChain.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/chains/{chainID}/activate`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Activate a chain
     */
    async activateChain(requestParameters: ActivateChainRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.activateChainRaw(requestParameters, initOverrides);
    }

    /**
     * Configure a trusted node to be an access node.
     */
    async addAccessNodeRaw(requestParameters: AddAccessNodeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling addAccessNode.');
        }

        if (requestParameters.publicKey === null || requestParameters.publicKey === undefined) {
            throw new runtime.RequiredError('publicKey','Required parameter requestParameters.publicKey was null or undefined when calling addAccessNode.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/chains/{chainID}/access-node/{publicKey}`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))).replace(`{${"publicKey"}}`, encodeURIComponent(String(requestParameters.publicKey))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Configure a trusted node to be an access node.
     */
    async addAccessNode(requestParameters: AddAccessNodeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.addAccessNodeRaw(requestParameters, initOverrides);
    }

    /**
     */
    async attachToWebsocketRaw(requestParameters: AttachToWebsocketRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling attachToWebsocket.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v2/chains/{chainID}/ws`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async attachToWebsocket(requestParameters: AttachToWebsocketRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.attachToWebsocketRaw(requestParameters, initOverrides);
    }

    /**
     * Deactivate a chain
     */
    async deactivateChainRaw(requestParameters: DeactivateChainRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling deactivateChain.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/chains/{chainID}/deactivate`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deactivate a chain
     */
    async deactivateChain(requestParameters: DeactivateChainRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deactivateChainRaw(requestParameters, initOverrides);
    }

    /**
     * Get information about a specific chain
     */
    async getChainInfoRaw(requestParameters: GetChainInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ChainInfoResponse>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling getChainInfo.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/chains/{chainID}`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainInfoResponseFromJSON(jsonValue));
    }

    /**
     * Get information about a specific chain
     */
    async getChainInfo(requestParameters: GetChainInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ChainInfoResponse> {
        const response = await this.getChainInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a list of all chains
     */
    async getChainsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ChainInfoResponse>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/chains`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ChainInfoResponseFromJSON));
    }

    /**
     * Get a list of all chains
     */
    async getChains(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ChainInfoResponse>> {
        const response = await this.getChainsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get information about the deployed committee
     */
    async getCommitteeInfoRaw(requestParameters: GetCommitteeInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CommitteeInfoResponse>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling getCommitteeInfo.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/chains/{chainID}/committee`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommitteeInfoResponseFromJSON(jsonValue));
    }

    /**
     * Get information about the deployed committee
     */
    async getCommitteeInfo(requestParameters: GetCommitteeInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CommitteeInfoResponse> {
        const response = await this.getCommitteeInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all available chain contracts
     */
    async getContractsRaw(requestParameters: GetContractsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ContractInfoResponse>>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling getContracts.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/chains/{chainID}/contracts`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ContractInfoResponseFromJSON));
    }

    /**
     * Get all available chain contracts
     */
    async getContracts(requestParameters: GetContractsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ContractInfoResponse>> {
        const response = await this.getContractsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get the ISC request ID for the given Ethereum transaction hash
     */
    async getRequestIDFromEVMTransactionIDRaw(requestParameters: GetRequestIDFromEVMTransactionIDRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling getRequestIDFromEVMTransactionID.');
        }

        if (requestParameters.txHash === null || requestParameters.txHash === undefined) {
            throw new runtime.RequiredError('txHash','Required parameter requestParameters.txHash was null or undefined when calling getRequestIDFromEVMTransactionID.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v2/chains/{chainID}/evm/tx/{txHash}`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))).replace(`{${"txHash"}}`, encodeURIComponent(String(requestParameters.txHash))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Get the ISC request ID for the given Ethereum transaction hash
     */
    async getRequestIDFromEVMTransactionID(requestParameters: GetRequestIDFromEVMTransactionIDRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.getRequestIDFromEVMTransactionIDRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Fetch the raw value associated with the given key in the chain state
     */
    async getStateValueRaw(requestParameters: GetStateValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<number>>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling getStateValue.');
        }

        if (requestParameters.stateKey === null || requestParameters.stateKey === undefined) {
            throw new runtime.RequiredError('stateKey','Required parameter requestParameters.stateKey was null or undefined when calling getStateValue.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v2/chains/{chainID}/state/{stateKey}`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))).replace(`{${"stateKey"}}`, encodeURIComponent(String(requestParameters.stateKey))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Fetch the raw value associated with the given key in the chain state
     */
    async getStateValue(requestParameters: GetStateValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<number>> {
        const response = await this.getStateValueRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Remove an access node.
     */
    async removeAccessNodeRaw(requestParameters: RemoveAccessNodeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling removeAccessNode.');
        }

        if (requestParameters.publicKey === null || requestParameters.publicKey === undefined) {
            throw new runtime.RequiredError('publicKey','Required parameter requestParameters.publicKey was null or undefined when calling removeAccessNode.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/chains/{chainID}/access-node/{publicKey}`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))).replace(`{${"publicKey"}}`, encodeURIComponent(String(requestParameters.publicKey))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove an access node.
     */
    async removeAccessNode(requestParameters: RemoveAccessNodeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removeAccessNodeRaw(requestParameters, initOverrides);
    }

}
