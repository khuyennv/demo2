import {
  IsIn,
  IsOptional,
  IsString,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { User } from "src/entities/User";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends BaseDto<User> {
    @ApiProperty({
        default: "dnYUBEand",
        description: "User's generated code"
    })
    @IsString()
    @Property()
    code: string

    @ApiProperty({
        default: null,
        description: "User's phone number"
    })
    // @IsString()
    @IsOptional()
    @Property()
    phoneNumber: string

    @ApiProperty({
        default: null,
        required: false,
        description: "User's email"
    })
    @IsOptional()
    @Property()
    email: string

    @ApiProperty({
        default: 0,
        description: "If user is an Employee"
    })
    @IsOptional()
    @IsIn([0, 1, true, false])
    @Property()
    isEmployee: number

    @ApiProperty({
        default: 0,
        description: "If user is an Employer"
    })
    @IsOptional()
    @IsIn([0, 1, true, false])
    @Property()
    isEmployer: number

    @ApiProperty({
        default: 1,
        description: "If user is an independent Employer"
    })
    @IsOptional()
    @IsIn([0, 1, true, false])
    @Property()
    isPersonal: number

    @ApiProperty({
        default: 0,
        description: "Is Social login"
    })
    @IsOptional()
    @IsIn([0, 1, true, false])
    @Property()
    isFromSocial: number

    @ApiProperty({
        default: 0,
        description: "Social id"
    })
    @IsOptional()
    @Property()
    socialId: string
}
