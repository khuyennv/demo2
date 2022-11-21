import { BaseController } from "src/base/base.controller";
import { User } from "src/entities/User";

import {
  Controller,
  Get,
} from "@nestjs/common";

import { UserService } from "./user.service";

@Controller("users")
export class UserController extends BaseController {
    constructor(
        private readonly userService: UserService,
    ) {
        super();
    }
    
	@Get("")
    async all(): Promise<User[]> {

		return this.userService.index()
    }
}
