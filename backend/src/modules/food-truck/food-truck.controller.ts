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
import { MessageComponent } from "../../components/message.component";
import { SearchFoodTruckDto } from "./dto/search-food-truck.dto";
import { FoodTruckService } from "./food-truck.service";

@ApiBearerAuth()
@ApiTags('Food Trucks')
@Controller("food-trucks")
export class FoodTruckController extends BaseController {
    constructor(private readonly foodTruckService: FoodTruckService, private i18n: MessageComponent) { super(i18n) }

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
