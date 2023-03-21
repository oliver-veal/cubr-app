/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfirmAuthRequestBody } from '../models/ConfirmAuthRequestBody';
import type { CreateLoginSessionResult } from '../models/CreateLoginSessionResult';
import type { LoginSession } from '../models/LoginSession';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AddonService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * confirm_auth addon
     * Confirms an authorization request for a user
     * @param sessionId
     * @param requestBody
     * @returns any OK response.
     * @throws ApiError
     */
    public addonConfirmAuth(
        sessionId: string,
        requestBody: ConfirmAuthRequestBody,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/addon/confirm_auth',
            query: {
                'session_id': sessionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `session-already-confirmed: Bad Request response.`,
                401: `unauthorized: Unauthorized response.`,
                500: `internal-error: Internal Server Error response.`,
            },
        });
    }

    /**
     * create_login_session addon
     * Create login session
     * @returns CreateLoginSessionResult OK response.
     * @throws ApiError
     */
    public addonCreateLoginSession(): CancelablePromise<CreateLoginSessionResult> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/addon/create_login_session',
            errors: {
                401: `unauthorized: Unauthorized response.`,
                500: `internal-error: Internal Server Error response.`,
            },
        });
    }

    /**
     * deny_auth addon
     * Denies an authorization request for a user
     * @param sessionId Login Session ID
     * @returns any OK response.
     * @throws ApiError
     */
    public addonDenyAuth(
        sessionId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/addon/deny_auth',
            query: {
                'session_id': sessionId,
            },
            errors: {
                400: `session-already-confirmed: Bad Request response.`,
                401: `unauthorized: Unauthorized response.`,
                500: `internal-error: Internal Server Error response.`,
            },
        });
    }

    /**
     * get_login_session addon
     * Get login session
     * @param sessionId Login Session ID
     * @returns LoginSession OK response.
     * @throws ApiError
     */
    public addonGetLoginSession(
        sessionId: string,
    ): CancelablePromise<LoginSession> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/addon/get_login_session',
            query: {
                'session_id': sessionId,
            },
            errors: {
                400: `session-not-found: Bad Request response.`,
                401: `unauthorized: Unauthorized response.`,
                500: `internal-error: Internal Server Error response.`,
            },
        });
    }

}
