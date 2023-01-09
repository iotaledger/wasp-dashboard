/* tslint:disable */
/* eslint-disable */
/**
 * Wasp API
 * REST API for the Wasp node
 *
 * The version of the OpenAPI document: 0.4.0-alpha.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  DKSharesInfo,
  DKSharesPostRequest,
  InfoResponse,
  NodeOwnerCertificateRequest,
  PeeringNodeIdentityResponse,
  PeeringNodeStatusResponse,
  PeeringTrustRequest,
  ValidationError,
} from '../models';
import {
    DKSharesInfoFromJSON,
    DKSharesInfoToJSON,
    DKSharesPostRequestFromJSON,
    DKSharesPostRequestToJSON,
    InfoResponseFromJSON,
    InfoResponseToJSON,
    NodeOwnerCertificateRequestFromJSON,
    NodeOwnerCertificateRequestToJSON,
    PeeringNodeIdentityResponseFromJSON,
    PeeringNodeIdentityResponseToJSON,
    PeeringNodeStatusResponseFromJSON,
    PeeringNodeStatusResponseToJSON,
    PeeringTrustRequestFromJSON,
    PeeringTrustRequestToJSON,
    ValidationErrorFromJSON,
    ValidationErrorToJSON,
} from '../models';

export interface DistrustPeerRequest {
    peeringTrustRequest: PeeringTrustRequest;
}

export interface GenerateDKSRequest {
    dKSharesPostRequest: DKSharesPostRequest;
}

export interface GetDKSInfoRequest {
    sharedAddress: string;
}

export interface SetNodeOwnerRequest {
    nodeOwnerCertificateRequest: NodeOwnerCertificateRequest;
}

export interface TrustPeerRequest {
    peeringTrustRequest: PeeringTrustRequest;
}

/**
 * 
 */
export class NodeApi extends runtime.BaseAPI {

    /**
     * Distrust a peering node
     */
    async distrustPeerRaw(requestParameters: DistrustPeerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.peeringTrustRequest === null || requestParameters.peeringTrustRequest === undefined) {
            throw new runtime.RequiredError('peeringTrustRequest','Required parameter requestParameters.peeringTrustRequest was null or undefined when calling distrustPeer.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/peers/trusted`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: PeeringTrustRequestToJSON(requestParameters.peeringTrustRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Distrust a peering node
     */
    async distrustPeer(requestParameters: DistrustPeerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.distrustPeerRaw(requestParameters, initOverrides);
    }

    /**
     * Generate a new distributed key
     */
    async generateDKSRaw(requestParameters: GenerateDKSRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DKSharesPostRequest>> {
        if (requestParameters.dKSharesPostRequest === null || requestParameters.dKSharesPostRequest === undefined) {
            throw new runtime.RequiredError('dKSharesPostRequest','Required parameter requestParameters.dKSharesPostRequest was null or undefined when calling generateDKS.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/dks`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DKSharesPostRequestToJSON(requestParameters.dKSharesPostRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DKSharesPostRequestFromJSON(jsonValue));
    }

    /**
     * Generate a new distributed key
     */
    async generateDKS(requestParameters: GenerateDKSRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DKSharesPostRequest> {
        const response = await this.generateDKSRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get basic information about all configured peers
     */
    async getAllPeersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PeeringNodeStatusResponse>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/peers`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PeeringNodeStatusResponseFromJSON));
    }

    /**
     * Get basic information about all configured peers
     */
    async getAllPeers(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PeeringNodeStatusResponse>> {
        const response = await this.getAllPeersRaw(initOverrides);
        return await response.value();
    }

    /**
     * Return the Wasp configuration
     */
    async getConfigurationRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: string; }>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/config`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Return the Wasp configuration
     */
    async getConfiguration(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: string; }> {
        const response = await this.getConfigurationRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get information about the shared address DKS configuration
     */
    async getDKSInfoRaw(requestParameters: GetDKSInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DKSharesInfo>> {
        if (requestParameters.sharedAddress === null || requestParameters.sharedAddress === undefined) {
            throw new runtime.RequiredError('sharedAddress','Required parameter requestParameters.sharedAddress was null or undefined when calling getDKSInfo.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/dks/{sharedAddress}`.replace(`{${"sharedAddress"}}`, encodeURIComponent(String(requestParameters.sharedAddress))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DKSharesInfoFromJSON(jsonValue));
    }

    /**
     * Get information about the shared address DKS configuration
     */
    async getDKSInfo(requestParameters: GetDKSInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DKSharesInfo> {
        const response = await this.getDKSInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns private information about this node.
     */
    async getInfoRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<InfoResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/info`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InfoResponseFromJSON(jsonValue));
    }

    /**
     * Returns private information about this node.
     */
    async getInfo(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<InfoResponse> {
        const response = await this.getInfoRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get basic peer info of the current node
     */
    async getPeeringIdentityRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PeeringNodeIdentityResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/peers/identity`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PeeringNodeIdentityResponseFromJSON(jsonValue));
    }

    /**
     * Get basic peer info of the current node
     */
    async getPeeringIdentity(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PeeringNodeIdentityResponse> {
        const response = await this.getPeeringIdentityRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get trusted peers
     */
    async getTrustedPeersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PeeringNodeIdentityResponse>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/peers/trusted`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PeeringNodeIdentityResponseFromJSON));
    }

    /**
     * Get trusted peers
     */
    async getTrustedPeers(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PeeringNodeIdentityResponse>> {
        const response = await this.getTrustedPeersRaw(initOverrides);
        return await response.value();
    }

    /**
     * Returns the node version.
     */
    async getVersionRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v2/node/version`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Returns the node version.
     */
    async getVersion(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.getVersionRaw(initOverrides);
        return await response.value();
    }

    /**
     * Sets the node owner
     */
    async setNodeOwnerRaw(requestParameters: SetNodeOwnerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.nodeOwnerCertificateRequest === null || requestParameters.nodeOwnerCertificateRequest === undefined) {
            throw new runtime.RequiredError('nodeOwnerCertificateRequest','Required parameter requestParameters.nodeOwnerCertificateRequest was null or undefined when calling setNodeOwner.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/owner/certificate`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NodeOwnerCertificateRequestToJSON(requestParameters.nodeOwnerCertificateRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Sets the node owner
     */
    async setNodeOwner(requestParameters: SetNodeOwnerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.setNodeOwnerRaw(requestParameters, initOverrides);
    }

    /**
     * Shut down the node
     */
    async shutdownNodeRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/shutdown`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Shut down the node
     */
    async shutdownNode(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.shutdownNodeRaw(initOverrides);
    }

    /**
     * Trust a peering node
     */
    async trustPeerRaw(requestParameters: TrustPeerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.peeringTrustRequest === null || requestParameters.peeringTrustRequest === undefined) {
            throw new runtime.RequiredError('peeringTrustRequest','Required parameter requestParameters.peeringTrustRequest was null or undefined when calling trustPeer.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/node/peers/trusted`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PeeringTrustRequestToJSON(requestParameters.peeringTrustRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Trust a peering node
     */
    async trustPeer(requestParameters: TrustPeerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.trustPeerRaw(requestParameters, initOverrides);
    }

}
