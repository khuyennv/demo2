import { isString } from "class-validator";

import {
  ArgumentMetadata,
  BadRequestException,
  ParseIntPipe,
  ParseIntPipeOptions,
} from "@nestjs/common";

import { MessageComponent } from "../components/message.component";
import { ErrorCodes } from "../constants/error-code.const";

export class ParseIntPipe1 extends ParseIntPipe {
    constructor(options?: ParseIntPipeOptions) {
        super(options)
    }

    async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
        try {
            return await super.transform(value, metadata)
        }
        catch (error) {
            if (error instanceof BadRequestException) {
                const response = error.getResponse()
                throw new BadRequestException({
                    message: MessageComponent.lang("VALIDATION_INPUT_TYPE_ERROR"),
                    cause: isString(response) ? response : response,
                    errorCode: ErrorCodes.VALIDATION_INPUT_TYPE_ERROR
                })
            }
            throw error
        }
    }
}
