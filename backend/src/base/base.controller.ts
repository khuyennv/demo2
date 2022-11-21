import { QueryFailedError } from "typeorm";

import { BadRequestException } from "@nestjs/common";

import { MessageComponent } from "../components/message.component";
import { ErrorCodes } from "../constants/error-code.const";
import { TokenDto } from "../dtos/token.dto";
import { BaseError } from "../exceptions/errors/base.error";
import { DatabaseError } from "../exceptions/errors/database.error";
import {
  throwDatabase,
  throwValidate,
} from "../utils/throw-exception.util";

export class BaseController {
    /**
     * @param  {any} error
     * @param  {TokenDto} token?
     */
    protected throwErrorProcess(error: any, token?: TokenDto) {
        console.log("Debug", error)
        const lang = token ? token.lang : "vi"
        if (error instanceof BaseError) {
            throw new BadRequestException({
                message: MessageComponent.lang(error.getMessage(), lang),
                cause: error.getCause(),
                errorCode: error.getErrorCode()
            })
        } else if (error instanceof TypeError) {
            throw throwValidate(
                MessageComponent.lang("UNKNOWN_ERROR", lang),
                { errorContent: { message: error.message, stack: error.stack } },
                ErrorCodes.SYNTAXERROR
            )
        } else if (error instanceof QueryFailedError) {
            throwDatabase(
                MessageComponent.lang("UNKNOWN_ERROR", lang),
                JSON.stringify(error),
                ErrorCodes.UNKNOWN
            )
        }

        throw new DatabaseError(
            MessageComponent.lang("UNKNOWN_ERROR", "vi"),
            { errorContent: error },
            ErrorCodes.UNKNOWN
        )
    }
}
