import { BaseDto } from "../base/base.dto";
import { Property } from "../utils/general.util";

class Obj { }

export class Point extends BaseDto<Obj> {
    @Property()
    latitude: number;

    @Property()
    longitude: number;

    /**
    * BaseModel Constructor
    *
    * @param {any} params
    */
    constructor(params?: Record<string, unknown>) {
        super();

        if (params) {
            this.setAttributes(params)
        }
    }
}
