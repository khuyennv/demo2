import {
  Test,
  TestingModule,
} from "@nestjs/testing";

import { foodTruckArray } from "../../../test/data/food-trucks.data";
import { SearchFoodTruckDto } from "./dto/search-food-truck.dto";
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
                    searchFoodTrucks: jest.fn().mockResolvedValue(foodTruckArray),
                }
            }],
        }).compile();

        controller = module.get<FoodTruckController>(FoodTruckController);
        service = module.get<FoodTruckService>(FoodTruckService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getCats', () => {
        it('should get an array of food trucks', async () => {
            await expect(controller.findAll({ latitude: 37.73911142974502, longitude: -122.38649338455488, distance: 1000 } as SearchFoodTruckDto)).resolves.toEqual(foodTruckArray);
        });
    });
});
