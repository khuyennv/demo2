import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { BaseService } from "../../base/base.service";
import { Point } from "../../dtos/point.dto";
import { FoodTruck } from "../../entities/FoodTruck";
import { LoggerService } from "../../logger/custom.logger";
import { findARound } from "../../utils/geo.util";
import { SearchFoodTruckDto } from "./dto/search-food-truck.dto";
import { FoodTruckRepository } from "./food-truck.repository";

@Injectable()
export class FoodTruckService extends BaseService<FoodTruck, FoodTruckRepository> {
    constructor(
        @InjectRepository(FoodTruck)
        repository: FoodTruckRepository,
        logger: LoggerService
    ) {
        super(repository, logger)
    }

    /**
     * @param  {SearchFoodTruckDto} filters
     * @returns Promise
     */
    async searchFoodTrucks(filters: SearchFoodTruckDto): Promise<FoodTruck[]> {
        const tableName = this.repository.metadata.tableName

        const query = this.repository.createQueryBuilder(tableName)
        const point = new Point({ latitude: filters.latitude, longitude: filters.longitude })

        let distance = filters.distance

        if (distance < 500) distance = 500 // default 1000 m

        // Calculate start point and end point
        const points = findARound(point, filters.distance)

        query.andWhere("latitude >= :latitude1", {
            latitude1: points.start.latitude
        })
            .andWhere("latitude <= :latitude2", {
                latitude2: points.end.latitude
            })
            .andWhere("longitude >= :longitude1", {
                longitude1: points.start.longitude
            })
            .andWhere("longitude <= :longitude2", {
                longitude2: points.end.longitude
			})

		console.log(query.getSql(), query.getParameters());

        return query.getMany()
    }
}

