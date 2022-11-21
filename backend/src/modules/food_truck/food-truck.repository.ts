import { FoodTruck } from "src/entities/FoodTruck";
import {
  DataSource,
  Repository,
} from "typeorm";

import { Injectable } from "@nestjs/common";

@Injectable()
export class FoodTruckRepository extends Repository<FoodTruck> {
    constructor(private dataSource: DataSource) {
        super(FoodTruck, dataSource.createEntityManager())
    }
}
