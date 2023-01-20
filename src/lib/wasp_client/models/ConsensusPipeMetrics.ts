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
/**
 * 
 * @export
 * @interface ConsensusPipeMetrics
 */
export interface ConsensusPipeMetrics {
    /**
     * 
     * @type {number}
     * @memberof ConsensusPipeMetrics
     */
    eventACSMsgPipeSize?: number;
    /**
     * 
     * @type {number}
     * @memberof ConsensusPipeMetrics
     */
    eventPeerLogIndexMsgPipeSize?: number;
    /**
     * 
     * @type {number}
     * @memberof ConsensusPipeMetrics
     */
    eventStateTransitionMsgPipeSize?: number;
    /**
     * 
     * @type {number}
     * @memberof ConsensusPipeMetrics
     */
    eventTimerMsgPipeSize?: number;
    /**
     * 
     * @type {number}
     * @memberof ConsensusPipeMetrics
     */
    eventVMResultMsgPipeSize?: number;
}

/**
 * Check if a given object implements the ConsensusPipeMetrics interface.
 */
export function instanceOfConsensusPipeMetrics(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ConsensusPipeMetricsFromJSON(json: any): ConsensusPipeMetrics {
    return ConsensusPipeMetricsFromJSONTyped(json, false);
}

export function ConsensusPipeMetricsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConsensusPipeMetrics {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'eventACSMsgPipeSize': !exists(json, 'eventACSMsgPipeSize') ? undefined : json['eventACSMsgPipeSize'],
        'eventPeerLogIndexMsgPipeSize': !exists(json, 'eventPeerLogIndexMsgPipeSize') ? undefined : json['eventPeerLogIndexMsgPipeSize'],
        'eventStateTransitionMsgPipeSize': !exists(json, 'eventStateTransitionMsgPipeSize') ? undefined : json['eventStateTransitionMsgPipeSize'],
        'eventTimerMsgPipeSize': !exists(json, 'eventTimerMsgPipeSize') ? undefined : json['eventTimerMsgPipeSize'],
        'eventVMResultMsgPipeSize': !exists(json, 'eventVMResultMsgPipeSize') ? undefined : json['eventVMResultMsgPipeSize'],
    };
}

export function ConsensusPipeMetricsToJSON(value?: ConsensusPipeMetrics | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'eventACSMsgPipeSize': value.eventACSMsgPipeSize,
        'eventPeerLogIndexMsgPipeSize': value.eventPeerLogIndexMsgPipeSize,
        'eventStateTransitionMsgPipeSize': value.eventStateTransitionMsgPipeSize,
        'eventTimerMsgPipeSize': value.eventTimerMsgPipeSize,
        'eventVMResultMsgPipeSize': value.eventVMResultMsgPipeSize,
    };
}
