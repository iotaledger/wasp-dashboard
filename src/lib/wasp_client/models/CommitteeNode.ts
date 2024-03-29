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
import type { PeeringNodeStatusResponse } from './PeeringNodeStatusResponse';
import {
    PeeringNodeStatusResponseFromJSON,
    PeeringNodeStatusResponseFromJSONTyped,
    PeeringNodeStatusResponseToJSON,
} from './PeeringNodeStatusResponse';

/**
 * 
 * @export
 * @interface CommitteeNode
 */
export interface CommitteeNode {
    /**
     * 
     * @type {string}
     * @memberof CommitteeNode
     */
    accessAPI: string;
    /**
     * 
     * @type {PeeringNodeStatusResponse}
     * @memberof CommitteeNode
     */
    node: PeeringNodeStatusResponse;
}

/**
 * Check if a given object implements the CommitteeNode interface.
 */
export function instanceOfCommitteeNode(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "accessAPI" in value;
    isInstance = isInstance && "node" in value;

    return isInstance;
}

export function CommitteeNodeFromJSON(json: any): CommitteeNode {
    return CommitteeNodeFromJSONTyped(json, false);
}

export function CommitteeNodeFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommitteeNode {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accessAPI': json['accessAPI'],
        'node': PeeringNodeStatusResponseFromJSON(json['node']),
    };
}

export function CommitteeNodeToJSON(value?: CommitteeNode | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'accessAPI': value.accessAPI,
        'node': PeeringNodeStatusResponseToJSON(value.node),
    };
}

