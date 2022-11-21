import { Type } from "class-transformer";
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { User } from "src/entities/User";
import { UserGender } from "src/enums/user.enum";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class SearchUserDto extends BaseDto<User>{
    @ApiProperty({
        required: false,
        description: "name"
    })
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @ApiProperty({
        type: [Number],
        required: false,
        description: "0: other | 1: male | 2: female",
    })
    @IsNumber({}, { each: true })
    @Type(() => Number)
    @Min(0)
    genders: UserGender[]

    @ApiProperty({
        required: false,
        description: "User's academic level"
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    academicId: number

    @ApiProperty({
        type: [Number],
        required: false,
        description: "search favourite categories"
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { each: true })
    companies: number[]

    @ApiProperty({
        type: [Number],
        required: false,
        description: "Filter follow categories"
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { each: true })
    categories: number[];

    @ApiProperty({
        type: [Number],
        required: false,
        description: "List category level 2",
    })
    @Property()
    @IsOptional()
    @Type(() => Number)
    UserExperienceCateIds: number[]

    @ApiProperty({
        required: false,
        description: "Experience id"
    })
    @IsOptional()
    @IsInt()
    @Property()
    @Type(() => Number)
    experienceId: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: "search theo district",
    })
    @IsOptional()
    @Type(() => Number)
    districtId: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: "latitude of location ",
    })
    @IsOptional()
    @Type(() => Number)
    latitude: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: "longitude of location ",
    })
    @IsOptional()
    @Type(() => Number)
    longitude: number;

    @ApiProperty({
        required: false,
        description: "Expect salary from"
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    expectSalaryFrom: number;

    @ApiProperty({
        required: false,
        description: "Expect salary to"
    })
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    expectSalaryTo: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: "Radius need to search(m)",
    })
    @IsOptional()
    @Type(() => Number)
    distance: number;

    @ApiProperty({
        required: false,
        description: "Age from"
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    ageFrom: number

    @ApiProperty({
        required: false,
        description: "Age to"
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    ageTo: number

    @ApiProperty({
        required: false,
        description: "Verify Kyc"
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    verifyKyc: number
}
