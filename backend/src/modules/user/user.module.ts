import { ApiResponseService } from "src/api-response/api-response.service";
import { MessageComponent } from "src/components/message.component";
import { User } from "src/entities/User";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UserModule,
    ],
    providers: [UserRepository, UserService, MessageComponent, ApiResponseService],
    exports: [TypeOrmModule, UserService],
    controllers: [UserController],
})

export class UserModule {

}
