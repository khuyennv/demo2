import { BaseDto } from "src/base/base.dto";
import { User } from "src/entities/User";
import { Property } from "src/utils/general.util";

export class GetUserDto extends BaseDto<User> {
    @Property()
    id: number

    @Property()
    code: string

    @Property()
    phoneNumber: string

    @Property()
    email: string

    @Property()
    name: string

    @Property()
    gender: number

    @Property()
    academicId: number

    @Property()
    language: string

    @Property()
    birthday: string

    @Property()
    avatar: string

    @Property()
    companyId: number

    @Property()
    shortAddress: string

    @Property()
    isEmployee: number

    @Property()
    isEmployer: number

    @Property()
    isPersonal: number

    @Property()
    points: number

    @Property()
    favCats?: number[]

    @Property()
    experience?: number[]
}