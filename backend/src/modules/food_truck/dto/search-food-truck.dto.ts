import { Type } from "class-transformer";
import {
  IsInt,
  IsNumber,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { FoodTruck } from "src/entities/FoodTruck";

import { ApiProperty } from "@nestjs/swagger";

export class SearchFoodTruckDto extends BaseDto<FoodTruck> {
    @ApiProperty({
        type: Number,
        required: false,
        description: "latitude of location ",
    })
    @Type(() => Number)
    @IsNumber()
    latitude: number

    @ApiProperty({
        type: Number,
        required: false,
        description: "longitude of location ",
    })
    @IsNumber()
    @Type(() => Number)
    longitude: number

    @ApiProperty({
        type: Number,
        required: false,
        description: "Radius need to search(m)",
    })
    @IsInt()
    @Type(() => Number)
    distance: number
}
