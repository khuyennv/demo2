import {
  DataSource,
  Repository,
} from "typeorm";

import { Injectable } from "@nestjs/common";

import { FoodTruck } from "../../entities/FoodTruck";

@Injectable()
export class FoodTruckRepository extends Repository<FoodTruck> {
    constructor(private dataSource: DataSource) {
        super(FoodTruck, dataSource.createEntityManager())
    }
}
