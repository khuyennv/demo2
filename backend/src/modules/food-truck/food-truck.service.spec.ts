import {
  Test,
  TestingModule,
} from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FoodTruck } from "../../entities/FoodTruck";
import { LoggerService } from "../../logger/custom.logger";
import { FoodTruckController } from "./food-truck.controller";
import { FoodTruckRepository } from "./food-truck.repository";
import { FoodTruckService } from "./food-truck.service";

describe('FoodTruckService', () => {
    let service: FoodTruckService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([FoodTruck]),
            ],
            controllers: [FoodTruckController],
            providers: [FoodTruckService, FoodTruckRepository, LoggerService],
        }).compile();

        service = module.get<FoodTruckService>(FoodTruckService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
