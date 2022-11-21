import { Expose } from "class-transformer";
import {
  BaseEntity,
  Column,
  Entity,
} from "typeorm";

@Entity("user")
export class User extends BaseEntity {
  @Column("int", { primary: true, generated: "increment", name: "id" })
  id: number;

  @Column("varchar", { unique: true, name: "code", length: 12 })
  code: string;

  @Column("varchar", { unique: true, name: "phone_number", length: 50 })
  phoneNumber: string;

  @Column("varchar", {
    name: "email",
    nullable: true,
    length: 100,
    default: "''",
  })
  email: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    length: 100,
    default: "''",
  })
  name: string | null;

  @Column("tinyint", {
    name: "gender",
    default: 0,
    comment: "0: other | 1: male | 2: female",
  })
  gender: number;

  @Column("varchar", {
    name: "language",
    length: 12,
    default: "'vi'",
    comment: "vi: Vietnamese | en: English | ...",
  })
  language: string;

  @Column("date", { name: "birthday", nullable: true })
  birthday: string | null;

  @Column("int", {
    name: "status",
    comment: "0: inactive| 1: active| 2: block| 3: delete",
    default: () => 0,
  })
  status: number;

  @Column("varchar", {
    name: "avatar",
    nullable: true,
    length: 255,
    default: "''",
  })
  avatar: string | null;

  @Column("int", { name: "academic_id", nullable: true })
  academicId: number | null;

  @Column("int", { name: "province_id", nullable: true })
  provinceId: number | null;

  @Column("int", { name: "district_id", nullable: true })
  districtId: number | null;

  @Column("varchar", {
    name: "address_full",
    nullable: true,
    comment: "Cache full address",
    length: 255,
    default: "''",
  })
  addressFull: string | null;

  @Column("double", { name: "latitude", nullable: true, default: 0 })
  latitude: number | null;

  @Column("double", { name: "longitude", nullable: true, default: 0 })
  longitude: number | null;

  @Column("tinyint", {
    name: "is_employee",
    nullable: true,
    default: () => "'0'",
  })
  isEmployee: number | null;

  @Column("tinyint", { name: "is_employer", default: () => 0 })
  isEmployer: number;

  @Column("tinyint", { name: "is_personal", default: () => 0 })
  isPersonal: number;

  @Column("tinyint", { name: "verify_kyc", default: () => 0 })
  verifyKyc: number;

  @Column("varchar", {
    name: "verify_option_1",
    length: 255,
    nullable: true,
    default: "''",
  })
  verifyOption1: string | null;

  @Column("varchar", {
    name: "verify_option_2",
    length: 255,
    nullable: true,
    default: "''",
  })
  verifyOption2: string | null;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Expose()
  get userCode(): string {
    return this.code;
  }
}
