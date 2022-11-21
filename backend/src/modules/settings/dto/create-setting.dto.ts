import { IsString } from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { Setting } from "src/entities/Setting";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class CreateSettingDto extends BaseDto<Setting>{
    @ApiProperty({
        required: true,
        description: "Setting name"
    })
    @Property()
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
        description: "Setting value"
    })
    @Property()
    @IsString()
    value: string;

    @ApiProperty({
        required: true,
        description: "Setting type"
    })
    @Property()
    @IsString()
    type: string;
}
