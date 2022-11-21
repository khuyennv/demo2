import { Type } from "class-transformer";
import {
  IsInt,
  IsOptional,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { User } from "src/entities/User";

import { ApiProperty } from "@nestjs/swagger";

export class FilterUserDto extends BaseDto<User>{
    @ApiProperty({
        default: 0,
        description: "User's gender 0: other | 1: male | 2: female",
        type: Number,
        required: false,
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    gender: number

    @ApiProperty({
        default: 0,
        type: Number,
        required: false,
        description: "User's academic level"
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    academicId: number

    @ApiProperty({
        default: 0,
        type: Number,
        required: false,
        description: "company id"
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    companyId: number

    @ApiProperty({
        default: 0,
        type: Number,
        required: false,
        description: "User's province"
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    provinceId: number

    @ApiProperty({
        default: 0,
        type: Number,
        required: false,
        description: "User's district"
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    districtId: number

    @ApiProperty({
        default: 1,
        required: false,
        description: "If user is an Employee"
    })
    @IsOptional()
    @Type(() => Number)
    isEmployee: number

    @ApiProperty({
        default: 0,
        type: Number,
        required: false,
        description: "If user is an Employer"
    })
    @IsOptional()
    @Type(() => Number)
    isEmployer: number

    @ApiProperty({
        default: 0,
        required: false,
        description: "If user is an independent Employer"
    })
    @IsOptional()
    @Type(() => Number)
    isPersonal: number

    @ApiProperty({
        default: 1,
        required: false,
        description: "Verify Kyc"
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    verifyKyc: number
}
