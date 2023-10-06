/* tslint:disable */
/* eslint-disable */
/**
 * gasless TRON service REST api
 * Service to publish TRON transactions
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { RequestMessage } from './RequestMessage';
import {
    RequestMessageFromJSON,
    RequestMessageFromJSONTyped,
    RequestMessageToJSON,
} from './RequestMessage';

/**
 * 
 * @export
 * @interface RequestData
 */
export interface RequestData {
    /**
     * 
     * @type {string}
     * @memberof RequestData
     */
    fee: string;
    /**
     * 
     * @type {string}
     * @memberof RequestData
     */
    feeToken: string;
    /**
     * 
     * @type {string}
     * @memberof RequestData
     */
    feeReceiver: string;
    /**
     * 
     * @type {number}
     * @memberof RequestData
     */
    deadline: number;
    /**
     * 
     * @type {number}
     * @memberof RequestData
     */
    nonce: number;
    /**
     * 
     * @type {Array<RequestMessage>}
     * @memberof RequestData
     */
    messages: Array<RequestMessage>;
}

/**
 * Check if a given object implements the RequestData interface.
 */
export function instanceOfRequestData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "fee" in value;
    isInstance = isInstance && "feeToken" in value;
    isInstance = isInstance && "feeReceiver" in value;
    isInstance = isInstance && "deadline" in value;
    isInstance = isInstance && "nonce" in value;
    isInstance = isInstance && "messages" in value;

    return isInstance;
}

export function RequestDataFromJSON(json: any): RequestData {
    return RequestDataFromJSONTyped(json, false);
}

export function RequestDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fee': json['fee'],
        'feeToken': json['feeToken'],
        'feeReceiver': json['feeReceiver'],
        'deadline': json['deadline'],
        'nonce': json['nonce'],
        'messages': ((json['messages'] as Array<any>).map(RequestMessageFromJSON)),
    };
}

export function RequestDataToJSON(value?: RequestData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'fee': value.fee,
        'feeToken': value.feeToken,
        'feeReceiver': value.feeReceiver,
        'deadline': value.deadline,
        'nonce': value.nonce,
        'messages': ((value.messages as Array<any>).map(RequestMessageToJSON)),
    };
}
