import Request from "fastify";

import {
  Controller,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AppService } from "./app.service";
import { Shift } from "./dtos/Shift.dto";
import { BaseError } from "./exceptions/errors/base.error";
import { DatabaseError } from "./exceptions/errors/database.error";
import { ValidateError } from "./exceptions/errors/validate.error";
import {
  convertToBinary,
  startTimeOfDay,
} from "./utils/general.util";
import { RolesGuard } from "./validators/roles.guard";

@Controller()
@UseGuards(RolesGuard)
export class AppController {
    constructor(
        private readonly appService: AppService,
    ) { }

    @Get("profile")
    async getHello(@Req() request: Request): Promise<string> {

        console.log(startTimeOfDay())
        console.log(startTimeOfDay(false))

        return JSON.stringify([this.appService.getHello(), request.headers]);
    }

    @Get("exceptions")
    async TestException(@Req() request: Request): Promise<string> {
        try {
            throw new ValidateError("validate", "fdf", 400)
            // throwError<ValidateError>("database", "fdf", 400)
        } catch (e) {
            if (e instanceof ValidateError) {
                console.log("ValidateError", e)
            } else if (e instanceof DatabaseError) {
                console.log("DatabaseError", e);
            } else if (e instanceof BaseError) {
                console.log("BaseError", e);
            }
        }

        return "test"
    }

    @Get("test")
    async test(): Promise<unknown> {
        const a = convertToBinary([
            new Shift({ timeFrom: 1, timeTo: 10 }),
            new Shift({ timeFrom: 10.5, timeTo: 14.3 })
        ])
        // let test = await this.fjobItemService.pickAGiftFromStock("CGV")
        // console.log("Debug", test);
        return { message: "Request Succeed!" };
    }

    @Get("healthz")
    selfCheck(): unknown {
        return { message: "Request Succeed!" };
    }
}
