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
  ChainRecord,
  ConsensusPipeMetrics,
  ConsensusWorkflowStatus,
  DKSharesInfo,
  DKSharesPostRequest,
  NodeConnectionMessagesMetrics,
  NodeConnectionMetrics,
  NodeOwnerCertificateRequest,
  NodeOwnerCertificateResponse,
  PeeringNodeStatus,
  PeeringTrustedNode,
} from '../models';
import {
    ChainRecordFromJSON,
    ChainRecordToJSON,
    ConsensusPipeMetricsFromJSON,
    ConsensusPipeMetricsToJSON,
    ConsensusWorkflowStatusFromJSON,
    ConsensusWorkflowStatusToJSON,
    DKSharesInfoFromJSON,
    DKSharesInfoToJSON,
    DKSharesPostRequestFromJSON,
    DKSharesPostRequestToJSON,
    NodeConnectionMessagesMetricsFromJSON,
    NodeConnectionMessagesMetricsToJSON,
    NodeConnectionMetricsFromJSON,
    NodeConnectionMetricsToJSON,
    NodeOwnerCertificateRequestFromJSON,
    NodeOwnerCertificateRequestToJSON,
    NodeOwnerCertificateResponseFromJSON,
    NodeOwnerCertificateResponseToJSON,
    PeeringNodeStatusFromJSON,
    PeeringNodeStatusToJSON,
    PeeringTrustedNodeFromJSON,
    PeeringTrustedNodeToJSON,
} from '../models';

export interface AdmChainChainIDAccessNodeAddPostRequest {
    chainID: string;
    publicKey: string;
}

export interface AdmChainChainIDAccessNodeRemovePostRequest {
    chainID: string;
    publicKey: string;
}

export interface AdmChainChainIDActivatePostRequest {
    chainID: string;
}

export interface AdmChainChainIDConsensusMetricsPipeGetRequest {
    chainID: string;
}

export interface AdmChainChainIDConsensusStatusGetRequest {
    chainID: string;
}

export interface AdmChainChainIDDeactivatePostRequest {
    chainID: string;
}

export interface AdmChainChainIDInfoGetRequest {
    chainID: string;
}

export interface AdmChainChainIDNodeconnMetricsGetRequest {
    chainID: string;
}

export interface AdmChainrecordChainIDGetRequest {
    chainID: string;
}

export interface AdmChainrecordPostRequest {
    record: ChainRecord;
}

export interface AdmDksPostRequest {
    dKSharesPostRequest: DKSharesPostRequest;
}

export interface AdmDksSharedAddressGetRequest {
    sharedAddress: string;
}

export interface AdmNodeOwnerCertificatePostRequest {
    request: NodeOwnerCertificateRequest;
}

export interface AdmPeeringTrustedPostRequest {
    peeringTrustedNode: PeeringTrustedNode;
}

export interface AdmPeeringTrustedPubKeyDeleteRequest {
    pubKey: string;
}

export interface AdmPeeringTrustedPubKeyGetRequest {
    pubKey: string;
}

export interface AdmPeeringTrustedPubKeyPutRequest {
    pubKey: string;
    peeringTrustedNode: PeeringTrustedNode;
}

/**
 * 
 */
export class AdminApi extends runtime.BaseAPI {

    /**
     * Add an access node to a chain
     */
    async admChainChainIDAccessNodeAddPostRaw(requestParameters: AdmChainChainIDAccessNodeAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling admChainChainIDAccessNodeAddPost.');
        }

        if (requestParameters.publicKey === null || requestParameters.publicKey === undefined) {
            throw new runtime.RequiredError('publicKey','Required parameter requestParameters.publicKey was null or undefined when calling admChainChainIDAccessNodeAddPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chain/{chainID}/access-node/add`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))).replace(`{${"PublicKey"}}`, encodeURIComponent(String(requestParameters.publicKey))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Add an access node to a chain
     */
    async admChainChainIDAccessNodeAddPost(requestParameters: AdmChainChainIDAccessNodeAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.admChainChainIDAccessNodeAddPostRaw(requestParameters, initOverrides);
    }

    /**
     * Remove an access node from a chain
     */
    async admChainChainIDAccessNodeRemovePostRaw(requestParameters: AdmChainChainIDAccessNodeRemovePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling admChainChainIDAccessNodeRemovePost.');
        }

        if (requestParameters.publicKey === null || requestParameters.publicKey === undefined) {
            throw new runtime.RequiredError('publicKey','Required parameter requestParameters.publicKey was null or undefined when calling admChainChainIDAccessNodeRemovePost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chain/{chainID}/access-node/remove`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))).replace(`{${"PublicKey"}}`, encodeURIComponent(String(requestParameters.publicKey))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove an access node from a chain
     */
    async admChainChainIDAccessNodeRemovePost(requestParameters: AdmChainChainIDAccessNodeRemovePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.admChainChainIDAccessNodeRemovePostRaw(requestParameters, initOverrides);
    }

    /**
     * Activate a chain
     */
    async admChainChainIDActivatePostRaw(requestParameters: AdmChainChainIDActivatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling admChainChainIDActivatePost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chain/{chainID}/activate`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Activate a chain
     */
    async admChainChainIDActivatePost(requestParameters: AdmChainChainIDActivatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.admChainChainIDActivatePostRaw(requestParameters, initOverrides);
    }

    /**
     * Get consensus pipe metrics
     */
    async admChainChainIDConsensusMetricsPipeGetRaw(requestParameters: AdmChainChainIDConsensusMetricsPipeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConsensusPipeMetrics>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling admChainChainIDConsensusMetricsPipeGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chain/{chainID}/consensus/metrics/pipe`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConsensusPipeMetricsFromJSON(jsonValue));
    }

    /**
     * Get consensus pipe metrics
     */
    async admChainChainIDConsensusMetricsPipeGet(requestParameters: AdmChainChainIDConsensusMetricsPipeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConsensusPipeMetrics> {
        const response = await this.admChainChainIDConsensusMetricsPipeGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get chain state statistics for the given chain ID
     */
    async admChainChainIDConsensusStatusGetRaw(requestParameters: AdmChainChainIDConsensusStatusGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConsensusWorkflowStatus>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling admChainChainIDConsensusStatusGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chain/{chainID}/consensus/status`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConsensusWorkflowStatusFromJSON(jsonValue));
    }

    /**
     * Get chain state statistics for the given chain ID
     */
    async admChainChainIDConsensusStatusGet(requestParameters: AdmChainChainIDConsensusStatusGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConsensusWorkflowStatus> {
        const response = await this.admChainChainIDConsensusStatusGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Deactivate a chain
     */
    async admChainChainIDDeactivatePostRaw(requestParameters: AdmChainChainIDDeactivatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling admChainChainIDDeactivatePost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chain/{chainID}/deactivate`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deactivate a chain
     */
    async admChainChainIDDeactivatePost(requestParameters: AdmChainChainIDDeactivatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.admChainChainIDDeactivatePostRaw(requestParameters, initOverrides);
    }

    /**
     * Get basic chain info.
     */
    async admChainChainIDInfoGetRaw(requestParameters: AdmChainChainIDInfoGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling admChainChainIDInfoGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chain/{chainID}/info`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Get basic chain info.
     */
    async admChainChainIDInfoGet(requestParameters: AdmChainChainIDInfoGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.admChainChainIDInfoGetRaw(requestParameters, initOverrides);
    }

    /**
     * Get chain node connection metrics for the given chain ID
     */
    async admChainChainIDNodeconnMetricsGetRaw(requestParameters: AdmChainChainIDNodeconnMetricsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<NodeConnectionMessagesMetrics>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling admChainChainIDNodeconnMetricsGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chain/{chainID}/nodeconn/metrics`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NodeConnectionMessagesMetricsFromJSON(jsonValue));
    }

    /**
     * Get chain node connection metrics for the given chain ID
     */
    async admChainChainIDNodeconnMetricsGet(requestParameters: AdmChainChainIDNodeconnMetricsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<NodeConnectionMessagesMetrics> {
        const response = await this.admChainChainIDNodeconnMetricsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get cummulative chains node connection metrics
     */
    async admChainNodeconnMetricsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<NodeConnectionMetrics>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chain/nodeconn/metrics`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NodeConnectionMetricsFromJSON(jsonValue));
    }

    /**
     * Get cummulative chains node connection metrics
     */
    async admChainNodeconnMetricsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<NodeConnectionMetrics> {
        const response = await this.admChainNodeconnMetricsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Find the chain record for the given chain ID
     */
    async admChainrecordChainIDGetRaw(requestParameters: AdmChainrecordChainIDGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ChainRecord>> {
        if (requestParameters.chainID === null || requestParameters.chainID === undefined) {
            throw new runtime.RequiredError('chainID','Required parameter requestParameters.chainID was null or undefined when calling admChainrecordChainIDGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chainrecord/{chainID}`.replace(`{${"chainID"}}`, encodeURIComponent(String(requestParameters.chainID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainRecordFromJSON(jsonValue));
    }

    /**
     * Find the chain record for the given chain ID
     */
    async admChainrecordChainIDGet(requestParameters: AdmChainrecordChainIDGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ChainRecord> {
        const response = await this.admChainrecordChainIDGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a new chain record
     */
    async admChainrecordPostRaw(requestParameters: AdmChainrecordPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.record === null || requestParameters.record === undefined) {
            throw new runtime.RequiredError('record','Required parameter requestParameters.record was null or undefined when calling admChainrecordPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/adm/chainrecord`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ChainRecordToJSON(requestParameters.record),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create a new chain record
     */
    async admChainrecordPost(requestParameters: AdmChainrecordPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.admChainrecordPostRaw(requestParameters, initOverrides);
    }

    /**
     * Get the list of chain records in the node
     */
    async admChainrecordsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ChainRecord>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/chainrecords`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ChainRecordFromJSON));
    }

    /**
     * Get the list of chain records in the node
     */
    async admChainrecordsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ChainRecord>> {
        const response = await this.admChainrecordsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Generate a new distributed key
     */
    async admDksPostRaw(requestParameters: AdmDksPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DKSharesInfo>> {
        if (requestParameters.dKSharesPostRequest === null || requestParameters.dKSharesPostRequest === undefined) {
            throw new runtime.RequiredError('dKSharesPostRequest','Required parameter requestParameters.dKSharesPostRequest was null or undefined when calling admDksPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/adm/dks`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DKSharesPostRequestToJSON(requestParameters.dKSharesPostRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DKSharesInfoFromJSON(jsonValue));
    }

    /**
     * Generate a new distributed key
     */
    async admDksPost(requestParameters: AdmDksPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DKSharesInfo> {
        const response = await this.admDksPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get distributed key properties
     */
    async admDksSharedAddressGetRaw(requestParameters: AdmDksSharedAddressGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DKSharesInfo>> {
        if (requestParameters.sharedAddress === null || requestParameters.sharedAddress === undefined) {
            throw new runtime.RequiredError('sharedAddress','Required parameter requestParameters.sharedAddress was null or undefined when calling admDksSharedAddressGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/dks/{sharedAddress}`.replace(`{${"sharedAddress"}}`, encodeURIComponent(String(requestParameters.sharedAddress))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DKSharesInfoFromJSON(jsonValue));
    }

    /**
     * Get distributed key properties
     */
    async admDksSharedAddressGet(requestParameters: AdmDksSharedAddressGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DKSharesInfo> {
        const response = await this.admDksSharedAddressGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Provides a certificate, if the node recognizes the owner.
     */
    async admNodeOwnerCertificatePostRaw(requestParameters: AdmNodeOwnerCertificatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<NodeOwnerCertificateResponse>> {
        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling admNodeOwnerCertificatePost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/adm/node/owner/certificate`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NodeOwnerCertificateRequestToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NodeOwnerCertificateResponseFromJSON(jsonValue));
    }

    /**
     * Provides a certificate, if the node recognizes the owner.
     */
    async admNodeOwnerCertificatePost(requestParameters: AdmNodeOwnerCertificatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<NodeOwnerCertificateResponse> {
        const response = await this.admNodeOwnerCertificatePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Basic information about all configured peers.
     */
    async admPeeringEstablishedGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PeeringNodeStatus>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/peering/established`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PeeringNodeStatusFromJSON));
    }

    /**
     * Basic information about all configured peers.
     */
    async admPeeringEstablishedGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PeeringNodeStatus>> {
        const response = await this.admPeeringEstablishedGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Basic peer info of the current node.
     */
    async admPeeringSelfGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PeeringTrustedNode>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/peering/self`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PeeringTrustedNodeFromJSON(jsonValue));
    }

    /**
     * Basic peer info of the current node.
     */
    async admPeeringSelfGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PeeringTrustedNode> {
        const response = await this.admPeeringSelfGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get a list of trusted peers.
     */
    async admPeeringTrustedGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PeeringTrustedNode>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/peering/trusted`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PeeringTrustedNodeFromJSON));
    }

    /**
     * Get a list of trusted peers.
     */
    async admPeeringTrustedGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PeeringTrustedNode>> {
        const response = await this.admPeeringTrustedGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Trust the specified peer.
     */
    async admPeeringTrustedPostRaw(requestParameters: AdmPeeringTrustedPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PeeringTrustedNode>> {
        if (requestParameters.peeringTrustedNode === null || requestParameters.peeringTrustedNode === undefined) {
            throw new runtime.RequiredError('peeringTrustedNode','Required parameter requestParameters.peeringTrustedNode was null or undefined when calling admPeeringTrustedPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/adm/peering/trusted`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PeeringTrustedNodeToJSON(requestParameters.peeringTrustedNode),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PeeringTrustedNodeFromJSON(jsonValue));
    }

    /**
     * Trust the specified peer.
     */
    async admPeeringTrustedPost(requestParameters: AdmPeeringTrustedPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PeeringTrustedNode> {
        const response = await this.admPeeringTrustedPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Distrust the specified peer.
     */
    async admPeeringTrustedPubKeyDeleteRaw(requestParameters: AdmPeeringTrustedPubKeyDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.pubKey === null || requestParameters.pubKey === undefined) {
            throw new runtime.RequiredError('pubKey','Required parameter requestParameters.pubKey was null or undefined when calling admPeeringTrustedPubKeyDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/peering/trusted/{pubKey}`.replace(`{${"pubKey"}}`, encodeURIComponent(String(requestParameters.pubKey))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Distrust the specified peer.
     */
    async admPeeringTrustedPubKeyDelete(requestParameters: AdmPeeringTrustedPubKeyDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.admPeeringTrustedPubKeyDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * Get details on a particular trusted peer.
     */
    async admPeeringTrustedPubKeyGetRaw(requestParameters: AdmPeeringTrustedPubKeyGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PeeringTrustedNode>> {
        if (requestParameters.pubKey === null || requestParameters.pubKey === undefined) {
            throw new runtime.RequiredError('pubKey','Required parameter requestParameters.pubKey was null or undefined when calling admPeeringTrustedPubKeyGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/peering/trusted/{pubKey}`.replace(`{${"pubKey"}}`, encodeURIComponent(String(requestParameters.pubKey))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PeeringTrustedNodeFromJSON(jsonValue));
    }

    /**
     * Get details on a particular trusted peer.
     */
    async admPeeringTrustedPubKeyGet(requestParameters: AdmPeeringTrustedPubKeyGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PeeringTrustedNode> {
        const response = await this.admPeeringTrustedPubKeyGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Trust the specified peer, the pub key is passed via the path.
     */
    async admPeeringTrustedPubKeyPutRaw(requestParameters: AdmPeeringTrustedPubKeyPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PeeringTrustedNode>> {
        if (requestParameters.pubKey === null || requestParameters.pubKey === undefined) {
            throw new runtime.RequiredError('pubKey','Required parameter requestParameters.pubKey was null or undefined when calling admPeeringTrustedPubKeyPut.');
        }

        if (requestParameters.peeringTrustedNode === null || requestParameters.peeringTrustedNode === undefined) {
            throw new runtime.RequiredError('peeringTrustedNode','Required parameter requestParameters.peeringTrustedNode was null or undefined when calling admPeeringTrustedPubKeyPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/adm/peering/trusted/{pubKey}`.replace(`{${"pubKey"}}`, encodeURIComponent(String(requestParameters.pubKey))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PeeringTrustedNodeToJSON(requestParameters.peeringTrustedNode),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PeeringTrustedNodeFromJSON(jsonValue));
    }

    /**
     * Trust the specified peer, the pub key is passed via the path.
     */
    async admPeeringTrustedPubKeyPut(requestParameters: AdmPeeringTrustedPubKeyPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PeeringTrustedNode> {
        const response = await this.admPeeringTrustedPubKeyPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Shut down the node
     */
    async admShutdownGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/adm/shutdown`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Shut down the node
     */
    async admShutdownGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.admShutdownGetRaw(initOverrides);
    }

}
