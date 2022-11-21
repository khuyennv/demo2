import { Property } from "src/utils/general.util";

import { BaseDto } from "../base/base.dto";

class Obj { }

export class TokenDto extends BaseDto<Obj> {
    @Property()
    userId: number;

    @Property()
    role: string;

    @Property()
    userCode: string;

    @Property()
    lang: string;

    @Property()
    apiKey: string;
}
