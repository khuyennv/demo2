import {
  IsOptional,
  IsString,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { Setting } from "src/entities/Setting";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class UpdateSettingDto extends BaseDto<Setting>{
    @ApiProperty({
        required: true,
        description: "Setting value"
    })
    @Property()
    @IsString()
    @IsOptional()
    value: string;

    @ApiProperty({
        required: true,
        description: "Setting type"
    })
    @Property()
    @IsString()
    @IsOptional()
    type: string;
}
