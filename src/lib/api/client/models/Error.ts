/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error = {
    /**
     * Is the error a server-side fault?
     */
    fault: boolean;
    /**
     * ID is a unique identifier for this particular occurrence of the problem.
     */
    id: string;
    /**
     * Message is a human-readable explanation specific to this occurrence of the problem.
     */
    message: string;
    /**
     * Name is the name of this class of errors.
     */
    name: string;
    /**
     * Is the error temporary?
     */
    temporary: boolean;
    /**
     * Is the error a timeout?
     */
    timeout: boolean;
};

