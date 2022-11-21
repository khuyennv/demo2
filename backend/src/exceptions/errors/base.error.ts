export class BaseError extends Error {
    protected because: string | Record<string, unknown>;
    protected errorCode: number;

    /**
     * @param {string} message 
     * @param {string | Record<string, unknown>} cause 
     * @param {number} errorCode 
     */
    constructor(message: string, cause: string | Record<string, unknown>, errorCode: number) {
        super(message);

        this.because = cause;
        this.errorCode = errorCode
    }

    /**
     * @returns {string | Record<string, unknown>}
     */
    getCause(): string | Record<string, unknown> {
		console.log("Debug", this.cause);
        return this.because
    }

    /**
     * @returns {number}
     */
    getErrorCode(): number {
        return this.errorCode
    }

    /**
     * @returns {string}
     */
    getMessage(): string {
        return this.message
    }
}