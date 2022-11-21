import { isString } from "class-validator";
import {
  FastifyReply as Response,
  FastifyRequest as Request,
} from "fastify";
import { ErrorCodes } from "src/constants/error-code.const";
import { BaseError } from "src/exceptions/errors/base.error";
import { DatabaseError } from "src/exceptions/errors/database.error";
import { isDebug } from "src/utils/general.util";
import { QueryFailedError } from "typeorm";

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { ConfigService } from "@nestjs/config";
import { SentryService } from "@ntegral/nestjs-sentry";
import * as Sentry from "@sentry/node";
import { Primitive } from "@sentry/types";

@Catch()
@Injectable()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly sentryService: SentryService,
        private readonly configService: ConfigService,
    ) { }

    private static handleResponse(
        response: Response,
        exception: HttpException | DatabaseError | QueryFailedError | Error | BaseError,
    ): [number, number] {
        let responseBody: unknown = { message: "Internal server error" }
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
        let errorCode: number

        if (exception instanceof ForbiddenException) {
            statusCode = exception.getStatus()
            errorCode = ErrorCodes.INVALID_HEADERS

            if (isDebug()) {
                responseBody = {
                    message: "Invalid Header",
                    errorCode: errorCode,
                    cause: exception.message + ": Invalid Header",
					code: exception.getStatus()
                }
            } else {
                responseBody = {
                    message: "Invalid Header",
                    errorCode: errorCode,
					code: exception.getStatus()
                }
            }

        } else if (exception instanceof HttpException) {
            const response = exception.getResponse()
            let message: unknown
            let cause: unknown

            if (isString(response)) {
                message = response
                errorCode = ErrorCodes.UNKNOWN
                cause = ""
            } else {
                const res = response as Record<string, unknown>

                message = res.message || "Unknown error"
                errorCode = res.errorCode as number || ErrorCodes.UNKNOWN
                cause = res.cause || message
            }

            if (isDebug()) {
                responseBody = {
                    message: message.toString(),
                    errorCode: errorCode,
                    cause,
					code: exception.getStatus()
                }
            } else {
                responseBody = {
                    message: message.toString(),
                    errorCode: errorCode,
					code: exception.getStatus()
                }
            }

            statusCode = exception.getStatus()
        } else if (exception instanceof DatabaseError) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            errorCode = exception.getErrorCode()

            if (isDebug()) {
                responseBody = {
                    errorCode: errorCode,
                    message: exception.message,
                    cause: exception.getCause(),
					code: statusCode
                }
            } else {
                responseBody = {
                    errorCode: errorCode,
                    message: exception.message,
					code: statusCode
                }
            }

        } else if (exception instanceof BaseError) {
            statusCode = HttpStatus.BAD_REQUEST
            errorCode = exception.getErrorCode()

            if (isDebug()) {
                responseBody = {
                    errorCode,
                    message: exception.message,
                    cause: exception.getCause(),
					code: statusCode
                }
            } else {
                responseBody = {
                    errorCode,
                    message: exception.message,
					code: statusCode
                }
            }
        } else if (exception instanceof QueryFailedError) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            errorCode = ErrorCodes.UNKNOWN
            responseBody = {
                errorCode,
                message: exception.message,
				code: statusCode
            }

            if (isDebug()) {
                responseBody = {
                    errorCode,
                    message: "Query database error.",
                    cause: exception,
					code: statusCode
                }
            } else {
                responseBody = {
                    errorCode,
                    message: "Query database error.",
					code: statusCode
                }
            }
        } else if (exception instanceof Error) {
			statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            errorCode = ErrorCodes.UNKNOWN
            if (isDebug()) {
                responseBody = {
                    errorCode,
                    message: "An error occurred, please try again.",
                    cause: exception.message,
					code: statusCode
                }
            } else {
                responseBody = {
                    errorCode,
                    message: "An error occurred, please try again",
					code: statusCode
                }
            }
        }

        void response.status(statusCode).send(responseBody)

        return [statusCode, errorCode]
    }

    /**
     * @param  {Request} request
     * @returns void
     */
    private handleInfoSentry(sentry: typeof Sentry, request: Request, statusCode: number): void {
        if (request) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            sentry.setTag("ip", JSON.stringify(request.headers["X-FORWARDED-FOR"]) + "," + request.ip)
            sentry.setTag("queryquery", JSON.stringify(request.query))
            sentry.setTag("method", request.method)

            sentry.setExtra("body", request.body)

            sentry.setTag("userAgent", request.headers["user-agent"])
            sentry.setTag("logLevel", this.configService.get<Primitive>("logLevel"))
            sentry.setTag("nodeEnv", this.configService.get<Primitive>("nodeEnv"))

            const url: string = request.headers["x-envoy-original-path"] ? request.headers["x-envoy-original-path"] as string : request.url
            sentry.setTag("url", `${request.hostname}${url}`)

            sentry.setTag("statusCode", statusCode)

            if (request.body["platform"]) {
                sentry.setTag("platform", JSON.stringify(request.body["platform"]))
            }

            if (request.body["appVersion"]) {
                sentry.setTag("appVersion", JSON.stringify(request.body["appVersion"]))
            }

            if (request.body["buildNumber"]) {
                sentry.setTag("buildNumber", JSON.stringify(request.body["buildNumber"]))
            }

            if (request.headers["x-request-id"]) {
                sentry.setTag("x-request-id", JSON.stringify(request.headers["x-request-id"]))
            }

            if (request.headers["x-fjob-role"]) {
                sentry.setTag("x-fjob-role", JSON.stringify(request.headers["x-fjob-role"]))
            }

            if (request.headers["x-fjob-code"]) {
                sentry.setTag("x-fjob-code", JSON.stringify(request.headers["x-fjob-code"]))
            }

            if (request.headers["x-fjob-id"]) {
                sentry.setTag("x-fjob-id", JSON.stringify(request.headers["x-fjob-id"]))
            }
        }
    }

    /**
     * @param  {HttpException|Error} exception
     * @param  {ArgumentsHost} host
     * @returns void
     */
    catch(exception: HttpException | Error, host: ArgumentsHost): void {
        const ctx: HttpArgumentsHost = host.switchToHttp()
        const response: Response = ctx.getResponse()

        const [statusCode, errorCode] = AllExceptionFilter.handleResponse(response, exception)

        if (
            errorCode !== 9104 &&
            errorCode !== 1011 &&
            errorCode !== 7200 &&
            errorCode !== 7201
        ) {
            const sentry: typeof Sentry = this.sentryService.instance()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            // this.handleInfoSentry(sentry, host.getArgs()[0] as Request, statusCode)
            // sentry.captureException(exception);
        }
    }

    /**
	 * @param exception 
	 */
    private handleMessage(
        exception: HttpException | DatabaseError | QueryFailedError | Error,
    ): string {

        let message = "Internal Server Error"

        if (exception instanceof HttpException) {
            message = JSON.stringify(exception.getResponse())
        } else if (exception instanceof DatabaseError) {
            message = exception.message
        } else if (exception instanceof QueryFailedError) {
            message = exception.stack.toString()
        } else if (exception instanceof Error) {
            message = exception.stack.toString()
        }

        return message
    }
}
