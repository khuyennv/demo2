import { MessageComponent } from "src/components/message.component";
import { FoodTruck } from "src/entities/FoodTruck";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "../user/user.module";
import { FoodTruckController } from "./food-truck.controller";
import { FoodTruckRepository } from "./food-truck.repository";
import { FoodTruckService } from "./food-truck.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([FoodTruck]),
        UserModule,
    ],
    controllers: [FoodTruckController],
    providers: [FoodTruckService, FoodTruckRepository, MessageComponent]
})
export class FoodTruckModule { }
