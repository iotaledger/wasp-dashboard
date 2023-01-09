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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface EventsResponse
 */
export interface EventsResponse {
    /**
     * 
     * @type {Array<string>}
     * @memberof EventsResponse
     */
    events?: Array<string>;
}

/**
 * Check if a given object implements the EventsResponse interface.
 */
export function instanceOfEventsResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EventsResponseFromJSON(json: any): EventsResponse {
    return EventsResponseFromJSONTyped(json, false);
}

export function EventsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'events': !exists(json, 'events') ? undefined : json['events'],
    };
}

export function EventsResponseToJSON(value?: EventsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'events': value.events,
    };
}

