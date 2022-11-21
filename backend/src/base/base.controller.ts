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
    private l: MessageComponent

    constructor(
        i18n: MessageComponent
    ) {
        this.l = i18n
    }

    protected throwErrorProcess(error: any, token?: TokenDto) {
        console.log("Debug", error)
        const lang = token ? token.lang : "vi"
        if (error instanceof BaseError) {
            throw new BadRequestException({
                message: this.l.lang(error.getMessage(), lang),
                cause: error.getCause(),
                errorCode: error.getErrorCode()
            })
        } else if (error instanceof TypeError) {
            throw throwValidate(
                this.l.lang("UNKNOWN_ERROR", lang),
                { errorContent: { message: error.message, stack: error.stack } },
                ErrorCodes.SYNTAXERROR
            )
        } else if (error instanceof QueryFailedError) {
            throwDatabase(
                this.l.lang("UNKNOWN_ERROR", lang),
                JSON.stringify(error),
                ErrorCodes.UNKNOWN
            )
        }

        throw new DatabaseError(
            this.l.lang("UNKNOWN_ERROR", "vi"),
            { errorContent: error },
            ErrorCodes.UNKNOWN
        )
    }
}
