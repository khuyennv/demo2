import {
  Test,
  TestingModule,
} from "@nestjs/testing";

import { FoodTruckController } from "./food-truck.controller";
import { FoodTruckService } from "./food-truck.service";

describe('FoodTruckController', () => {
    let controller: FoodTruckController;
    let service: FoodTruckService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FoodTruckController],
            providers: [{
                provide: FoodTruckService,
                useValue: {
                    searchFoodTrucks: jest.fn().mockResolvedValue([
                        { name: 'Test Cat 2', breed: 'Test Breed 2', age: 3 },
                        { name: 'Test Cat 3', breed: 'Test Breed 3', age: 2 },
                    ]),
                }
            }],
        }).compile();

        controller = module.get<FoodTruckController>(FoodTruckController);
        service = module.get<FoodTruckService>(FoodTruckService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
