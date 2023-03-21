/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCheckoutSessionResponseBody } from '../models/CreateCheckoutSessionResponseBody';
import type { CreatePortalSessionResponseBody } from '../models/CreatePortalSessionResponseBody';
import type { GetInvoicesResponseBody } from '../models/GetInvoicesResponseBody';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BillingService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * create-checkout-session billing
     * Create Stripe checkout session
     * @param returnUrl Return URL
     * @returns CreateCheckoutSessionResponseBody OK response.
     * @throws ApiError
     */
    public billingCreateCheckoutSession(
        returnUrl: string,
    ): CancelablePromise<CreateCheckoutSessionResponseBody> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/create-checkout-session',
            query: {
                'return_url': returnUrl,
            },
            errors: {
                401: `unauthorized: Unauthorized response.`,
                500: `internal-error: Internal Server Error response.`,
            },
        });
    }

    /**
     * create-portal-session billing
     * Create Stripe portal session
     * @param returnUrl Return URL
     * @returns CreatePortalSessionResponseBody OK response.
     * @throws ApiError
     */
    public billingCreatePortalSession(
        returnUrl: string,
    ): CancelablePromise<CreatePortalSessionResponseBody> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/create-portal-session',
            query: {
                'return_url': returnUrl,
            },
            errors: {
                401: `unauthorized: Unauthorized response.`,
                500: `internal-error: Internal Server Error response.`,
            },
        });
    }

    /**
     * get-invoices billing
     * Get last and upcoming Stripe invoice amounts and dates
     * @returns GetInvoicesResponseBody OK response.
     * @throws ApiError
     */
    public billingGetInvoices(): CancelablePromise<GetInvoicesResponseBody> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/invoices',
            errors: {
                401: `unauthorized: Unauthorized response.`,
                500: `internal-error: Internal Server Error response.`,
            },
        });
    }

    /**
     * webhook billing
     * Create Stripe portal session
     * @param stripeSignature
     * @returns any OK response.
     * @throws ApiError
     */
    public billingWebhook(
        stripeSignature: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/stripe/webhook',
            headers: {
                'Stripe-Signature': stripeSignature,
            },
            errors: {
                400: `bad-request: Bad Request response.`,
                401: `unauthorized: Unauthorized response.`,
                500: `internal-error: Internal Server Error response.`,
                503: `service-unavailable: Service Unavailable response.`,
            },
        });
    }

}
