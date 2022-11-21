import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MessageComponent } from "../../components/message.component";
import { FoodTruck } from "../../entities/FoodTruck";
import { FoodTruckController } from "./food-truck.controller";
import { FoodTruckRepository } from "./food-truck.repository";
import { FoodTruckService } from "./food-truck.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([FoodTruck]),
    ],
    controllers: [FoodTruckController],
    providers: [FoodTruckService, FoodTruckRepository, MessageComponent]
})
export class FoodTruckModule { }
