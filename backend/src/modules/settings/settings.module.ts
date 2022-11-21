import { MessageComponent } from "src/components/message.component";
import { Setting } from "src/entities/Setting";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SettingRepository } from "./setting-repository";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Setting
        ]),
    ],
    controllers: [SettingsController],
    providers: [SettingRepository, SettingsService, MessageComponent]
})

export class SettingsModule { }
