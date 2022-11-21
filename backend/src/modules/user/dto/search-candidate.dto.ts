import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from "class-validator";
import { UserGender } from "src/enums/user.enum";

import { ApiProperty } from "@nestjs/swagger";

export class SearchCandidateDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    category_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    province_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    district_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    exp_category_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @Min(0)
    exp_time: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @Min(0)
    wage_max: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    education_level_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsEnum(UserGender, {
        message: "Genders value must have value in " + JSON.stringify(UserGender)
    })
    gender: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    perPage: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    page: number;

}