import { User } from "src/entities/User";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

import { BaseDto } from "../base/base.dto";

export class UserDto extends BaseDto<User> {
    @ApiProperty()
    @Property()
    id: string;

    @ApiProperty()
    @Property()
    phoneNumber: string;

    @ApiProperty()
    @Property()
    email: string;

    @ApiProperty()
    @Property()
    name: string;

    @ApiProperty()
    @Property()
    birthday: string;

    @ApiProperty()
    @Property()
    status: number;

    @ApiProperty()
    @Property()
    avatar: string;

    @ApiProperty()
    @Property()
    academicId: number;

    @ApiProperty()
    @Property()
    provinceId: number;

    @ApiProperty()
    @Property()
    districtId: number;

    @ApiProperty()
    @Property()
    addressDetail: string;

    @ApiProperty()
    @Property()
    addressFull: string;

    @ApiProperty()
    @Property()
    latitude: number;

    @ApiProperty()
    @Property()
    longitude: number;

    @ApiProperty()
    @Property()
    isEmployee: number;

    @ApiProperty()
    @Property()
    isEmployer: number;

    @ApiProperty()
    @Property()
    isPersonal: number;

    @ApiProperty()
    @Property()
    verifyKyc: number;

    @ApiProperty()
    @Property()
    createdAt: Date;

    @ApiProperty()
    @Property()
    updatedAt: Date;
}
