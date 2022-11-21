import {
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  Length,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { User } from "src/entities/User";

import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends BaseDto<User>{
    @ApiProperty({
        default: "0353124287",
        required: false,
        description: "User's phone number"
    })
    @IsOptional()
    // @IsPhoneNumber()
    // @Length(8, 50)
    phoneNumber: string

    @ApiProperty({
        default: "testing@gmail.com",
        required: false,
        description: "User's email"
    })
    @IsOptional()
    @IsEmail()
    @Length(4, 100)
    email: string

    @ApiProperty({
        default: "Luis Fonsi",
        required: false,
        description: "User's full name"
    })
    @IsOptional()
    @Length(1, 100)
    name: string

    @ApiProperty({
        default: 0,
        required: false,
        description: "User's gender 0: other | 1: male | 2: female"
    })
    @IsOptional()
    @IsInt()
    gender: number

    @ApiProperty({
        default: "vi",
        description: "User's language"
    })
    language: string

    @ApiProperty({
        default: "2000-02-12",
        description: "User's birthday (Format: YYYY-MM-DD)"
    })
    @IsOptional()
    @IsDateString()
    birthday: string

    @ApiProperty({
        default: "",
        required: false,
        description: "User's profile picture"
    })
    @IsOptional()
    avatar: string

    @ApiProperty({
        default: 0,
        required: false,
        description: "company id"
    })
    @IsOptional()
    @IsInt()
    companyId: number


    @ApiProperty({
        default: 0,
        required: false,
        description: "User's academic level"
    })
    @IsOptional()
    @IsInt()
    academicId: number

    @ApiProperty({
        default: 0,
        required: false,
        description: "If user is an Employee"
    })
    @IsOptional()
    @IsIn([0, 1, true, false])
    isEmployee: number

    @ApiProperty({
        default: 0,
        required: false,
        description: "If user is an Employer"
    })
    @IsOptional()
    @IsIn([0, 1, true, false])
    isEmployer: number

    @ApiProperty({
        default: 1,
        required: false,
        description: "If user is an independent Employer"
    })
    @IsOptional()
    @IsIn([0, 1, true, false])
    isPersonal: number

    @ApiProperty({
        default: 1,
        required: false,
        description: "Expect salary from"
    })
    @IsOptional()
    @IsInt()
    expectSalaryFrom: number;

    @ApiProperty({
        default: 1,
        required: false,
        description: "Expect salary to"
    })
    @IsInt()
    @IsOptional()
    expectSalaryTo: number;

    @ApiProperty({
        default: 1,
        required: false,
        description: "Expect salary to"
    })
    @IsInt()
    @IsOptional()
    expectSalaryUnit: number;

    @ApiProperty({
        default: 1,
        required: false,
        description: "Verify Kyc"
    })
    @IsOptional()
    @IsInt()
    verifyKyc: number

    @ApiProperty({
        default: "abc",
        required: false,
        description: "Verify Option 1"
    })
    @IsOptional()
    verifyOption1: string

    @ApiProperty({
        default: "xyz",
        required: false,
        description: "Verify Option 2"
    })
    @IsOptional()
    verifyOption2: string
}
