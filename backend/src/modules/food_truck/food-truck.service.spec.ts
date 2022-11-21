import {
  Test,
  TestingModule,
} from "@nestjs/testing";

import { FoodTruckService } from "./food-truck.service";

describe('FoodTruckService', () => {
    let service: FoodTruckService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FoodTruckService],
        }).compile();

        service = module.get<FoodTruckService>(FoodTruckService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
