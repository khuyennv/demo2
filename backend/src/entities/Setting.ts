import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ApiProperty } from "@nestjs/swagger";

@Entity("setting")
export class Setting extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    @ApiProperty()
    id: number;

    @Column("varchar", { name: "name", length: 50 })
    @ApiProperty()
    name: string;

    @Column("text", { name: "value" })
    @ApiProperty()
    value: string;

    @Column("varchar", { name: "type", length: 10, default: () => "''" })
    @ApiProperty()
    type: string;

    @Column("timestamp", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    })
    @ApiProperty()
    createdAt: Date;

    @Column("timestamp", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    })
    @ApiProperty()
    updatedAt: Date;
}
