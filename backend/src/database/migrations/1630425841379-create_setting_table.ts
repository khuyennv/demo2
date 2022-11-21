import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from "typeorm";

export class createSettingTable1630425841379 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "setting",
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
                        name: "name",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "value",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "type",
                        type: "varchar",
                        length: "10",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "current_timestamp()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "current_timestamp()",
                        onUpdate: "current_timestamp()",
                    },
                ],
            }), true
        );

        await queryRunner.createIndices("setting", [
            new TableIndex({ name: "ix_setting_name", columnNames: ["name"] }),
        ]);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("setting");
    }

}
