import {
  Test,
  TestingModule,
} from "@nestjs/testing";

import { FoodTruckController } from "./food-truck.controller";
import { FoodTruckService } from "./food-truck.service";

describe('FoodTruckController', () => {
    let controller: FoodTruckController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FoodTruckController],
            providers: [FoodTruckService],
        }).compile();

        controller = module.get<FoodTruckController>(FoodTruckController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
