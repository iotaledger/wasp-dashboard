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
import type { AliasOutputMetricItem } from './AliasOutputMetricItem';
import {
    AliasOutputMetricItemFromJSON,
    AliasOutputMetricItemFromJSONTyped,
    AliasOutputMetricItemToJSON,
} from './AliasOutputMetricItem';
import type { InOutputMetricItem } from './InOutputMetricItem';
import {
    InOutputMetricItemFromJSON,
    InOutputMetricItemFromJSONTyped,
    InOutputMetricItemToJSON,
} from './InOutputMetricItem';
import type { InStateOutputMetricItem } from './InStateOutputMetricItem';
import {
    InStateOutputMetricItemFromJSON,
    InStateOutputMetricItemFromJSONTyped,
    InStateOutputMetricItemToJSON,
} from './InStateOutputMetricItem';
import type { InterfaceMetricItem } from './InterfaceMetricItem';
import {
    InterfaceMetricItemFromJSON,
    InterfaceMetricItemFromJSONTyped,
    InterfaceMetricItemToJSON,
} from './InterfaceMetricItem';
import type { OnLedgerRequestMetricItem } from './OnLedgerRequestMetricItem';
import {
    OnLedgerRequestMetricItemFromJSON,
    OnLedgerRequestMetricItemFromJSONTyped,
    OnLedgerRequestMetricItemToJSON,
} from './OnLedgerRequestMetricItem';
import type { TransactionIDMetricItem } from './TransactionIDMetricItem';
import {
    TransactionIDMetricItemFromJSON,
    TransactionIDMetricItemFromJSONTyped,
    TransactionIDMetricItemToJSON,
} from './TransactionIDMetricItem';
import type { TransactionMetricItem } from './TransactionMetricItem';
import {
    TransactionMetricItemFromJSON,
    TransactionMetricItemFromJSONTyped,
    TransactionMetricItemToJSON,
} from './TransactionMetricItem';
import type { TxInclusionStateMsgMetricItem } from './TxInclusionStateMsgMetricItem';
import {
    TxInclusionStateMsgMetricItemFromJSON,
    TxInclusionStateMsgMetricItemFromJSONTyped,
    TxInclusionStateMsgMetricItemToJSON,
} from './TxInclusionStateMsgMetricItem';
import type { UTXOInputMetricItem } from './UTXOInputMetricItem';
import {
    UTXOInputMetricItemFromJSON,
    UTXOInputMetricItemFromJSONTyped,
    UTXOInputMetricItemToJSON,
} from './UTXOInputMetricItem';

/**
 * 
 * @export
 * @interface ChainMetrics
 */
export interface ChainMetrics {
    /**
     * 
     * @type {AliasOutputMetricItem}
     * @memberof ChainMetrics
     */
    inAliasOutput?: AliasOutputMetricItem;
    /**
     * 
     * @type {OnLedgerRequestMetricItem}
     * @memberof ChainMetrics
     */
    inOnLedgerRequest?: OnLedgerRequestMetricItem;
    /**
     * 
     * @type {InOutputMetricItem}
     * @memberof ChainMetrics
     */
    inOutput?: InOutputMetricItem;
    /**
     * 
     * @type {InStateOutputMetricItem}
     * @memberof ChainMetrics
     */
    inStateOutput?: InStateOutputMetricItem;
    /**
     * 
     * @type {TxInclusionStateMsgMetricItem}
     * @memberof ChainMetrics
     */
    inTxInclusionState?: TxInclusionStateMsgMetricItem;
    /**
     * 
     * @type {TransactionMetricItem}
     * @memberof ChainMetrics
     */
    outPublishGovernanceTransaction?: TransactionMetricItem;
    /**
     * 
     * @type {InterfaceMetricItem}
     * @memberof ChainMetrics
     */
    outPullLatestOutput?: InterfaceMetricItem;
    /**
     * 
     * @type {UTXOInputMetricItem}
     * @memberof ChainMetrics
     */
    outPullOutputByID?: UTXOInputMetricItem;
    /**
     * 
     * @type {TransactionIDMetricItem}
     * @memberof ChainMetrics
     */
    outPullTxInclusionState?: TransactionIDMetricItem;
}

/**
 * Check if a given object implements the ChainMetrics interface.
 */
export function instanceOfChainMetrics(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ChainMetricsFromJSON(json: any): ChainMetrics {
    return ChainMetricsFromJSONTyped(json, false);
}

export function ChainMetricsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChainMetrics {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'inAliasOutput': !exists(json, 'InAliasOutput') ? undefined : AliasOutputMetricItemFromJSON(json['InAliasOutput']),
        'inOnLedgerRequest': !exists(json, 'InOnLedgerRequest') ? undefined : OnLedgerRequestMetricItemFromJSON(json['InOnLedgerRequest']),
        'inOutput': !exists(json, 'InOutput') ? undefined : InOutputMetricItemFromJSON(json['InOutput']),
        'inStateOutput': !exists(json, 'InStateOutput') ? undefined : InStateOutputMetricItemFromJSON(json['InStateOutput']),
        'inTxInclusionState': !exists(json, 'InTxInclusionState') ? undefined : TxInclusionStateMsgMetricItemFromJSON(json['InTxInclusionState']),
        'outPublishGovernanceTransaction': !exists(json, 'OutPublishGovernanceTransaction') ? undefined : TransactionMetricItemFromJSON(json['OutPublishGovernanceTransaction']),
        'outPullLatestOutput': !exists(json, 'OutPullLatestOutput') ? undefined : InterfaceMetricItemFromJSON(json['OutPullLatestOutput']),
        'outPullOutputByID': !exists(json, 'OutPullOutputByID') ? undefined : UTXOInputMetricItemFromJSON(json['OutPullOutputByID']),
        'outPullTxInclusionState': !exists(json, 'OutPullTxInclusionState') ? undefined : TransactionIDMetricItemFromJSON(json['OutPullTxInclusionState']),
    };
}

export function ChainMetricsToJSON(value?: ChainMetrics | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'InAliasOutput': AliasOutputMetricItemToJSON(value.inAliasOutput),
        'InOnLedgerRequest': OnLedgerRequestMetricItemToJSON(value.inOnLedgerRequest),
        'InOutput': InOutputMetricItemToJSON(value.inOutput),
        'InStateOutput': InStateOutputMetricItemToJSON(value.inStateOutput),
        'InTxInclusionState': TxInclusionStateMsgMetricItemToJSON(value.inTxInclusionState),
        'OutPublishGovernanceTransaction': TransactionMetricItemToJSON(value.outPublishGovernanceTransaction),
        'OutPullLatestOutput': InterfaceMetricItemToJSON(value.outPullLatestOutput),
        'OutPullOutputByID': UTXOInputMetricItemToJSON(value.outPullOutputByID),
        'OutPullTxInclusionState': TransactionIDMetricItemToJSON(value.outPullTxInclusionState),
    };
}
