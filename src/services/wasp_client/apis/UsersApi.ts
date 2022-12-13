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
  AddUserRequest,
  UpdateUserPasswordRequest,
  UpdateUserPermissionsRequest,
  User,
  ValidationError,
} from '../models';
import {
    AddUserRequestFromJSON,
    AddUserRequestToJSON,
    UpdateUserPasswordRequestFromJSON,
    UpdateUserPasswordRequestToJSON,
    UpdateUserPermissionsRequestFromJSON,
    UpdateUserPermissionsRequestToJSON,
    UserFromJSON,
    UserToJSON,
    ValidationErrorFromJSON,
    ValidationErrorToJSON,
} from '../models';

export interface AddUserOperationRequest {
    addUserRequest: AddUserRequest;
}

export interface ChangeUserPasswordRequest {
    username: string;
    updateUserPasswordRequest: UpdateUserPasswordRequest;
}

export interface ChangeUserPermissionsRequest {
    username: string;
    updateUserPermissionsRequest: UpdateUserPermissionsRequest;
}

export interface DeleteUserRequest {
    username: string;
}

export interface GetUserRequest {
    username: string;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * Add a user
     */
    async addUserRaw(requestParameters: AddUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.addUserRequest === null || requestParameters.addUserRequest === undefined) {
            throw new runtime.RequiredError('addUserRequest','Required parameter requestParameters.addUserRequest was null or undefined when calling addUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddUserRequestToJSON(requestParameters.addUserRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Add a user
     */
    async addUser(requestParameters: AddUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.addUserRaw(requestParameters, initOverrides);
    }

    /**
     * Change user password
     */
    async changeUserPasswordRaw(requestParameters: ChangeUserPasswordRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling changeUserPassword.');
        }

        if (requestParameters.updateUserPasswordRequest === null || requestParameters.updateUserPasswordRequest === undefined) {
            throw new runtime.RequiredError('updateUserPasswordRequest','Required parameter requestParameters.updateUserPasswordRequest was null or undefined when calling changeUserPassword.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/users/{username}/password`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateUserPasswordRequestToJSON(requestParameters.updateUserPasswordRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Change user password
     */
    async changeUserPassword(requestParameters: ChangeUserPasswordRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.changeUserPasswordRaw(requestParameters, initOverrides);
    }

    /**
     * Change user permissions
     */
    async changeUserPermissionsRaw(requestParameters: ChangeUserPermissionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling changeUserPermissions.');
        }

        if (requestParameters.updateUserPermissionsRequest === null || requestParameters.updateUserPermissionsRequest === undefined) {
            throw new runtime.RequiredError('updateUserPermissionsRequest','Required parameter requestParameters.updateUserPermissionsRequest was null or undefined when calling changeUserPermissions.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/users/{username}/permissions`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateUserPermissionsRequestToJSON(requestParameters.updateUserPermissionsRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Change user permissions
     */
    async changeUserPermissions(requestParameters: ChangeUserPermissionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.changeUserPermissionsRaw(requestParameters, initOverrides);
    }

    /**
     * Deletes a user
     */
    async deleteUserRaw(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling deleteUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/users/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes a user
     */
    async deleteUser(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteUserRaw(requestParameters, initOverrides);
    }

    /**
     * Get a user
     */
    async getUserRaw(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling getUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/users/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * Get a user
     */
    async getUser(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.getUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a list of all users
     */
    async getUsersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<User>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Authorization authentication
        }

        const response = await this.request({
            path: `/v2/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserFromJSON));
    }

    /**
     * Get a list of all users
     */
    async getUsers(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<User>> {
        const response = await this.getUsersRaw(initOverrides);
        return await response.value();
    }

}
