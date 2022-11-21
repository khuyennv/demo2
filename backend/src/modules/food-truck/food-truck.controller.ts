import {
  Controller,
  Get,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import { BaseController } from "../../base/base.controller";
import { SearchFoodTruckDto } from "./dto/search-food-truck.dto";
import { FoodTruckService } from "./food-truck.service";

@ApiBearerAuth()
@ApiTags('Food Trucks')
@Controller("food-trucks")
export class FoodTruckController extends BaseController {
    constructor(private readonly foodTruckService: FoodTruckService) { super() }

    @Get()
    async findAll(
        @Query() filters: SearchFoodTruckDto,
    ) {
        try {
            return await this.foodTruckService.searchFoodTrucks(filters);
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }
}
