import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { FoodTruckModule } from "../modules/food-truck/food-truck.module";
import { FoodTruckService } from "../modules/food-truck/food-truck.service";

describe('Cats', () => {
    let app: INestApplication;
    let foodTruckService = { findAll: () => ['test'] };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [FoodTruckModule],
        })
            .overrideProvider(FoodTruckService)
            .useValue(foodTruckService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    // it(`/GET cats`, () => {
    //     return request(app.getHttpServer())
    //         .get('/cats')
    //         .expect(200)
    //         .expect({
    //             data: catsService.findAll(),
    //         });
    // });

    afterAll(async () => {
        await app.close();
    });
});