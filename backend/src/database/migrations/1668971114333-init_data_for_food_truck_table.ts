import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

import dataJson from "./data/food_trucks.json";

export class initDataForFoodTruckTable1668971114333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const serviceQuery = queryRunner.manager.createQueryBuilder().insert().into("food_truck")

        dataJson.forEach(element => {
            const foodTruck = {
                objectid: parseInt(element.objectid),
                applicant: element.applicant,
                facility_type: element.facilitytype,
                cnn: parseInt(element.cnn),
                location_description: element.locationdescription,
                address: element.address,
                block_lot: element.blocklot,
                block: element.block,
                lot: element.lot,
                status: element.status,
                food_items: element.fooditems ?? "",
                latitude: parseFloat(element.latitude),
                longitude: parseFloat(element.longitude),
                schedule: element.schedule,
                received: element.received,
                priorpermit: element.priorpermit,
                expirationdate: element.expirationdate,
            }

            void serviceQuery.values(foodTruck).execute()
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE food_truck RESTART IDENTITY CASCADE;`)
    }

}
