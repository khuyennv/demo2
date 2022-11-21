import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class createFoodTruckTable1668968412167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "food_truck",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        length: "11",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "objectid",
                        type: "int",
                        length: "11",
                    },
                    {
                        name: "applicant",
                        type: "varchar",
                        length: "150",
                        default: "''"
                    },
                    {
                        name: "facility_type",
                        type: "varchar",
                        length: "100",
                        default: "''"
                    },
                    {
                        name: "cnn",
                        type: "int",
                        length: "11",
                    },
                    {
                        name: "location_description",
                        type: "varchar",
                        length: "255",
                        default: "''"
                    },
                    {
                        name: "address",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "block_lot",
                        type: "varchar",
                        length: "20",
                        default: "''"
                    },
                    {
                        name: "block",
                        type: "varchar",
                        length: "20",
                        default: "''"
                    },
                    {
                        name: "lot",
                        type: "varchar",
                        length: "20",
                        default: "''"
                    },
                    {
                        name: "permit",
                        type: "varchar",
                        length: "20",
                        default: "''"
                    },
                    {
                        name: "status",
                        type: "varchar",
                        length: "20",
                        default: "''"
                    },
                    {
                        name: "food_items",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "latitude",
                        type: "double",
                        length: "15,10"
                    },
                    {
                        name: "longitude",
                        type: "double",
                        length: "15,10"
                    },
                    {
                        name: "schedule",
                        type: "text",
                    },
                    {
                        name: "received",
                        type: "varchar",
                        length: "20",
                        default: "''"
                    },
                    {
                        name: "priorpermit",
                        type: "varchar",
                        length: "4",
                        default: "''"
                    },
                    {
                        name: "expirationdate",
                        type: "datetime",
                        isNullable: true
                    },
                ],
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("food_truck");

    }

}
