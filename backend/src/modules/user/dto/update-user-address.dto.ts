import {
  IsInt,
  IsOptional,
  Length,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { User } from "src/entities/User";

import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserAddressInfoDto extends BaseDto<User>{
    @ApiProperty({
        default: 0,
        required: false,
        description: "User's province"
    })
    @IsOptional()
    @IsInt()
    provinceId: number

    @ApiProperty({
        default: 0,
        required: false,
        description: "User's district"
    })
    @IsOptional()
    @IsInt()
    districtId: number

    @ApiProperty({
        default: "số nhà 47",
        required: false,
        description: "User's address"
    })
    @IsOptional()
    @Length(0, 100)
    shortAddress: string

    @ApiProperty({
        default: "",
        required: false,
        description: "User's full address"
    })
    @IsOptional()
    addressFull: string

    @ApiProperty({
        default: 0,
        required: false,
        description: "User's latidtude"
    })
    @IsOptional()
    latitude: number

    @ApiProperty({
        default: 0,
        required: false,
        description: "User's longitude"
    })
    @IsOptional()
    longitude: number
}