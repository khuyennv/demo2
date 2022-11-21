import { BaseController } from "src/base/base.controller";
import { MessageComponent } from "src/components/message.component";
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
        private i18n: MessageComponent,
    ) {
        super(i18n);
    }
    
	@Get("")
    async all(): Promise<User[]> {

		return this.userService.index()
    }
}
