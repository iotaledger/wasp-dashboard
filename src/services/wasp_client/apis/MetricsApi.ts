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


import * as runtime from '../runtime';
import type {
  ChainMetrics,
  ConsensusPipeMetrics,
  ConsensusWorkflowMetrics,
  ValidationError,
} from '../models';
import {
    ChainMetricsFromJSON,
    ChainMetricsToJSON,
    ConsensusPipeMetricsFromJSON,
    ConsensusPipeMetricsToJSON,
    ConsensusWorkflowMetricsFromJSON,
    ConsensusWorkflowMetricsToJSON,
    ValidationErrorFromJSON,
    ValidationErrorToJSON,
} from '../models';

export interface GetChainMetricsRequest {
    chainID: string;
}

export interface GetChainPipeMetricsRequest {
    chainID: string;
}

export interface GetChainWorkflowMetricsRequest {
    chainID: string;
}

/**
 * 
 */
export class MetricsApi extends runtime.BaseAPI {

    /**
     * Get chain specific metrics.
     */
    async getChainMetricsRaw(requestParameters: GetChainMetricsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ChainMetrics>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling getChainMetrics.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/metrics/chain/{chainID}`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainMetricsFromJSON(jsonValue));
    }

    /**
     * Get chain specific metrics.
     */
    async getChainMetrics(requestParameters: GetChainMetricsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ChainMetrics> {
        const response = await this.getChainMetricsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get chain pipe event metrics.
     */
    async getChainPipeMetricsRaw(requestParameters: GetChainPipeMetricsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConsensusPipeMetrics>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling getChainPipeMetrics.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/metrics/chain/{chainID}/pipe`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConsensusPipeMetricsFromJSON(jsonValue));
    }

    /**
     * Get chain pipe event metrics.
     */
    async getChainPipeMetrics(requestParameters: GetChainPipeMetricsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConsensusPipeMetrics> {
        const response = await this.getChainPipeMetricsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get chain workflow metrics.
     */
    async getChainWorkflowMetricsRaw(requestParameters: GetChainWorkflowMetricsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConsensusWorkflowMetrics>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling getChainWorkflowMetrics.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/metrics/chain/{chainID}/workflow`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConsensusWorkflowMetricsFromJSON(jsonValue));
    }

    /**
     * Get chain workflow metrics.
     */
    async getChainWorkflowMetrics(requestParameters: GetChainWorkflowMetricsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConsensusWorkflowMetrics> {
        const response = await this.getChainWorkflowMetricsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get accumulated metrics.
     */
    async getL1MetricsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ChainMetrics>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/metrics/l1`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainMetricsFromJSON(jsonValue));
    }

    /**
     * Get accumulated metrics.
     */
    async getL1Metrics(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ChainMetrics> {
        const response = await this.getL1MetricsRaw(initOverrides);
        return await response.value();
    }

}
