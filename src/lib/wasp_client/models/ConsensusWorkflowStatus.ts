/* tslint:disable */
/* eslint-disable */
/**
 * Wasp API
 * REST API for the Wasp node
 *
 * The version of the OpenAPI document: 123
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
 * @interface ConsensusWorkflowStatus
 */
export interface ConsensusWorkflowStatus {
    /**
     * Shows current state index of the consensus
     * @type {number}
     * @memberof ConsensusWorkflowStatus
     */
    currentStateIndex?: number;
    /**
     * Shows if batch proposal is sent out in current consensus iteration
     * @type {boolean}
     * @memberof ConsensusWorkflowStatus
     */
    flagBatchProposalSent?: boolean;
    /**
     * Shows if consensus on batch is reached and known in current consensus iteration
     * @type {boolean}
     * @memberof ConsensusWorkflowStatus
     */
    flagConsensusBatchKnown?: boolean;
    /**
     * Shows if consensus algorithm is still not completed in current consensus iteration
     * @type {boolean}
     * @memberof ConsensusWorkflowStatus
     */
    flagInProgress?: boolean;
    /**
     * Shows if state output is received in current consensus iteration
     * @type {boolean}
     * @memberof ConsensusWorkflowStatus
     */
    flagStateReceived?: boolean;
    /**
     * Shows if consensus on transaction is reached in current consensus iteration
     * @type {boolean}
     * @memberof ConsensusWorkflowStatus
     */
    flagTransactionFinalized?: boolean;
    /**
     * Shows if transaction is posted to L1 in current consensus iteration
     * @type {boolean}
     * @memberof ConsensusWorkflowStatus
     */
    flagTransactionPosted?: boolean;
    /**
     * Shows if L1 reported that it has seen the transaction of current consensus iteration
     * @type {boolean}
     * @memberof ConsensusWorkflowStatus
     */
    flagTransactionSeen?: boolean;
    /**
     * Shows if virtual machine has returned its results in current consensus iteration
     * @type {boolean}
     * @memberof ConsensusWorkflowStatus
     */
    flagVMResultSigned?: boolean;
    /**
     * Shows if virtual machine is started in current consensus iteration
     * @type {boolean}
     * @memberof ConsensusWorkflowStatus
     */
    flagVMStarted?: boolean;
    /**
     * Shows when batch proposal was last sent out in current consensus iteration
     * @type {Date}
     * @memberof ConsensusWorkflowStatus
     */
    timeBatchProposalSent?: Date;
    /**
     * Shows when algorithm was last completed in current consensus iteration
     * @type {Date}
     * @memberof ConsensusWorkflowStatus
     */
    timeCompleted?: Date;
    /**
     * Shows when ACS results of consensus on batch was last received in current consensus iteration
     * @type {Date}
     * @memberof ConsensusWorkflowStatus
     */
    timeConsensusBatchKnown?: Date;
    /**
     * Shows when algorithm last noted that all the data for consensus on transaction had been received in current consensus iteration
     * @type {Date}
     * @memberof ConsensusWorkflowStatus
     */
    timeTransactionFinalized?: Date;
    /**
     * Shows when transaction was last posted to L1 in current consensus iteration
     * @type {Date}
     * @memberof ConsensusWorkflowStatus
     */
    timeTransactionPosted?: Date;
    /**
     * Shows when algorithm last noted that transaction hadd been seen by L1 in current consensus iteration
     * @type {Date}
     * @memberof ConsensusWorkflowStatus
     */
    timeTransactionSeen?: Date;
    /**
     * Shows when virtual machine results were last received and signed in current consensus iteration
     * @type {Date}
     * @memberof ConsensusWorkflowStatus
     */
    timeVMResultSigned?: Date;
    /**
     * Shows when virtual machine was last started in current consensus iteration
     * @type {Date}
     * @memberof ConsensusWorkflowStatus
     */
    timeVMStarted?: Date;
}

/**
 * Check if a given object implements the ConsensusWorkflowStatus interface.
 */
export function instanceOfConsensusWorkflowStatus(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ConsensusWorkflowStatusFromJSON(json: any): ConsensusWorkflowStatus {
    return ConsensusWorkflowStatusFromJSONTyped(json, false);
}

export function ConsensusWorkflowStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConsensusWorkflowStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'currentStateIndex': !exists(json, 'currentStateIndex') ? undefined : json['currentStateIndex'],
        'flagBatchProposalSent': !exists(json, 'flagBatchProposalSent') ? undefined : json['flagBatchProposalSent'],
        'flagConsensusBatchKnown': !exists(json, 'flagConsensusBatchKnown') ? undefined : json['flagConsensusBatchKnown'],
        'flagInProgress': !exists(json, 'flagInProgress') ? undefined : json['flagInProgress'],
        'flagStateReceived': !exists(json, 'flagStateReceived') ? undefined : json['flagStateReceived'],
        'flagTransactionFinalized': !exists(json, 'flagTransactionFinalized') ? undefined : json['flagTransactionFinalized'],
        'flagTransactionPosted': !exists(json, 'flagTransactionPosted') ? undefined : json['flagTransactionPosted'],
        'flagTransactionSeen': !exists(json, 'flagTransactionSeen') ? undefined : json['flagTransactionSeen'],
        'flagVMResultSigned': !exists(json, 'flagVMResultSigned') ? undefined : json['flagVMResultSigned'],
        'flagVMStarted': !exists(json, 'flagVMStarted') ? undefined : json['flagVMStarted'],
        'timeBatchProposalSent': !exists(json, 'timeBatchProposalSent') ? undefined : (new Date(json['timeBatchProposalSent'])),
        'timeCompleted': !exists(json, 'timeCompleted') ? undefined : (new Date(json['timeCompleted'])),
        'timeConsensusBatchKnown': !exists(json, 'timeConsensusBatchKnown') ? undefined : (new Date(json['timeConsensusBatchKnown'])),
        'timeTransactionFinalized': !exists(json, 'timeTransactionFinalized') ? undefined : (new Date(json['timeTransactionFinalized'])),
        'timeTransactionPosted': !exists(json, 'timeTransactionPosted') ? undefined : (new Date(json['timeTransactionPosted'])),
        'timeTransactionSeen': !exists(json, 'timeTransactionSeen') ? undefined : (new Date(json['timeTransactionSeen'])),
        'timeVMResultSigned': !exists(json, 'timeVMResultSigned') ? undefined : (new Date(json['timeVMResultSigned'])),
        'timeVMStarted': !exists(json, 'timeVMStarted') ? undefined : (new Date(json['timeVMStarted'])),
    };
}

export function ConsensusWorkflowStatusToJSON(value?: ConsensusWorkflowStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'currentStateIndex': value.currentStateIndex,
        'flagBatchProposalSent': value.flagBatchProposalSent,
        'flagConsensusBatchKnown': value.flagConsensusBatchKnown,
        'flagInProgress': value.flagInProgress,
        'flagStateReceived': value.flagStateReceived,
        'flagTransactionFinalized': value.flagTransactionFinalized,
        'flagTransactionPosted': value.flagTransactionPosted,
        'flagTransactionSeen': value.flagTransactionSeen,
        'flagVMResultSigned': value.flagVMResultSigned,
        'flagVMStarted': value.flagVMStarted,
        'timeBatchProposalSent': value.timeBatchProposalSent === undefined ? undefined : (value.timeBatchProposalSent.toISOString()),
        'timeCompleted': value.timeCompleted === undefined ? undefined : (value.timeCompleted.toISOString()),
        'timeConsensusBatchKnown': value.timeConsensusBatchKnown === undefined ? undefined : (value.timeConsensusBatchKnown.toISOString()),
        'timeTransactionFinalized': value.timeTransactionFinalized === undefined ? undefined : (value.timeTransactionFinalized.toISOString()),
        'timeTransactionPosted': value.timeTransactionPosted === undefined ? undefined : (value.timeTransactionPosted.toISOString()),
        'timeTransactionSeen': value.timeTransactionSeen === undefined ? undefined : (value.timeTransactionSeen.toISOString()),
        'timeVMResultSigned': value.timeVMResultSigned === undefined ? undefined : (value.timeVMResultSigned.toISOString()),
        'timeVMStarted': value.timeVMStarted === undefined ? undefined : (value.timeVMStarted.toISOString()),
    };
}

