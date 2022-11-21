import { Repository } from "typeorm";

import {
  Test,
  TestingModule,
} from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { foodTruckArray } from "../../../test/data/food-trucks.data";
import { FoodTruck } from "../../entities/FoodTruck";
import { LoggerModule } from "../../logger/logger.module";
import { SearchFoodTruckDto } from "./dto/search-food-truck.dto";
import { FoodTruckController } from "./food-truck.controller";
import { FoodTruckService } from "./food-truck.service";

describe('FoodTruckService', () => {
    let service: FoodTruckService;
    let repo: Repository<FoodTruck>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                LoggerModule,
            ],
            controllers: [FoodTruckController],
            providers: [FoodTruckService, {
                provide: getRepositoryToken(FoodTruck),
                useValue: {
                    createQueryBuilder: jest.fn(() => ({
                        andWhere: jest.fn().mockReturnThis(),
                        getMany: jest.fn().mockReturnValueOnce(foodTruckArray),
                    })),
                    metadata: { tableName: "food_truck" }
                },
            },],
        }).compile();

        service = module.get<FoodTruckService>(FoodTruckService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('searchFoodTrucks', () => {
        it('should return an array of foodTrucks', async () => {
            const foodTrucks = await service.searchFoodTrucks({ latitude: 37.73911142974502, longitude: -122.38649338455488, distance: 1000 } as SearchFoodTruckDto);
            expect(foodTrucks).toEqual(foodTruckArray);
        });
    });
});
