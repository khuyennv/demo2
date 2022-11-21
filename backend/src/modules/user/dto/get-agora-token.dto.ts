import {
  IsOptional,
  IsString,
} from "class-validator";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

const { RtcRole, RtmRole } = require('agora-access-token')

export class GetAgoraTokenDto {
    @ApiProperty({
        default: "test",
        description: "Call channel"
    })
    @IsString()
    @Property()
    channel: string

    @ApiProperty({
        default: RtcRole.PUBLISHER,
        required: false,
        description: "Role: PUBLISHER: 1 (recommended - default), SUBSCRIBER: 2\n"
    })
    @Property()
    @IsOptional()
    role: number

    @ApiProperty({
        default: 3600,
        required: false,
        description: "Expire in (seconds)"
    })
    @Property()
    @IsOptional()
    // @IsNumber()
    expireIn: number
}