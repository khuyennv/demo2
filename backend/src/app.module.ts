import { Module } from "@nestjs/common";
import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";
import {
  APP_FILTER,
  Reflector,
} from "@nestjs/core";
import { SentryModule } from "@ntegral/nestjs-sentry";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageComponent } from "./components/message.component";
import appConfig from "./configs/app.config";
import databaseConfig from "./configs/database.config";
import { DatabaseModule } from "./database/database.module";
import { AllExceptionFilter } from "./filter/exception.filter";
import { LoggerModule } from "./logger/logger.module";
import { FoodTruckModule } from "./modules/food_truck/food-truck.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { UserModule } from "./modules/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig],
        }),
        SentryModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (cfg: ConfigService) => ({
                dsn: cfg.get("SENTRY_DSN"),
                debug: true,
                environment: "dev",
                //   release: 'some_release', | null, // must create a release in sentry.io dashboard
                logLevel: 3 //based on sentry.io sublevel //
            }),
            inject: [ConfigService],
        }),
        // ScheduleModule.forRoot(),
        // RedisModule.forRootAsync({
        //     useFactory: (configService: ConfigService) => {
        //         console.log("Debug", configService.get("redisUri"));
        //         return {
        //             config: {
        //                 url: configService.get("redisUri"),
        //             },
        //         };
        //     },
        //     inject: [ConfigService]
        // }),
        // RabbitMQModule.forRootAsync(RabbitMQModule, {
        //     useFactory: (configService: ConfigService) => ({
        //         uri: configService.get("rabbitmqUri"),
        //         exchanges: [
        //             {
        //                 name: "exchange2",
        //                 type: "direct",
        //             },
        //             {
        //                 name: "exchange3",
        //                 type: "direct",
        //             },
        //         ],
        //     }),
        //     inject: [ConfigService],
        // }),
        // BullModule.forRootAsync({
        //     useFactory: async (configService: ConfigService) => ({
        //         redis: Object.assign(
        //             {},
        //             parseRedisUrl(configService.get("redisUri")) || {},
        //         ),
        //     }),
        //     inject: [ConfigService],
        // }),
        // BullModule.registerQueue({
        //     name: "audio",
        // }),
        LoggerModule,
        UserModule,
        DatabaseModule,
        SettingsModule,
        FoodTruckModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_FILTER, useClass: AllExceptionFilter },
        MessageComponent,
        Reflector,
    ],
})

export class AppModule {

}
