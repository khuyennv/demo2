import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class CreateUserTable1620123949296 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
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
                        name: "code",
                        type: "varchar",
                        length: "12",
                        isUnique: true
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        length: "50",
                        isUnique: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                        default: "''",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                        default: "''",
                    },
                    {
                        name: "gender",
                        type: "tinyint",
                        isNullable: true,
                        comment: "0: male | 1: female | 2: other",
                    },
                    {
                        name: "language",
                        type: "varchar",
                        length: "12",
                        default: "'vi'",
                        comment: "vi: Vietnamese | en: English | ...",
                    },
                    {
                        name: "birthday",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "int",
                        default: 0,
                        comment: "0: inactive| 1: active| 2: block| 3: delete",
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true,
                        default: "''",
                    },
                    {
                        name: "academic_id",
                        type: "int",
                        length: "11",
                        isNullable: true,
                    },
                    {
                        name: "province_id",
                        type: "int",
                        length: "11",
                        isNullable: true,
                    },
                    {
                        name: "district_id",
                        type: "int",
                        length: "11",
                        isNullable: true,
                    },
                    {
                        name: "address_detail",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                        comment: "Số nhà ngõ ...",
                        default: "''",
                    },
                    {
                        name: "address_full",
                        type: "varchar",
                        isNullable: true,
                        comment: "Cache full address",
                        default: "''",
                    },
                    {
                        name: "latitude",
                        type: "int",
                        length: "11",
                        isNullable: true,
                        default: 0,
                    },
                    {
                        name: "longitude",
                        type: "int",
                        length: "11",
                        isNullable: true,
                        default: 0,
                    },
                    {
                        name: "is_employee",
                        type: "tinyint",
                        length: "4",
                        isNullable: true,
                        default: 0,
                    },
                    {
                        name: "is_employer",
                        type: "tinyint",
                        length: "4",
                        default: 0,
                    },
                    {
                        name: "is_personal",
                        type: "tinyint",
                        length: "4",
                        default: 1,
                    },
                    {
                        name: "verify_kyc",
                        type: "tinyint",
                        length: "4",
                        default: 0,
                    },
                    {
                        name: "verify_option_1",
                        type: "varchar",
                        isNullable: true,
                        default: "''",
                    },
                    {
                        name: "verify_option_2",
                        type: "varchar",
                        isNullable: true,
                        default: "''",
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
                    },
                ],
            }),
        );

    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }
}
