import { Property } from "src/utils/general.util";

import { BaseDto } from "../base/base.dto";

class Obj { }

export class Shift extends BaseDto<Obj> {
    @Property()
    timeFrom: number

    @Property()
    timeTo: number
}
