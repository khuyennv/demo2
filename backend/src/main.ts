import { LogLevel } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  NestFactory,
  Reflector,
} from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import {
  DocumentBuilder,
  SwaggerModule,
} from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { MessageComponent } from "./components/message.component";
import { Env } from "./enums/app.enum";
import { LoggerModule } from "./logger/logger.module";
import { useRequestLogging } from "./middleware/request-logging";
import { isEnv } from "./utils/general.util";
import { RolesGuard } from "./validators/roles.guard";
import {
  ValidationPipe422,
} from "./validators/validation-pipe-tranform.validate";

async function bootstrap() {
    console.log(
        "Application starting.",
        process.env.LOG_LEVEL,
        process.env.NODE_ENV
    )
    let logLevelsDefault: LogLevel[] = ["log", "error", "warn", "debug", "verbose"]
    let opts: Record<string, unknown> = {}

    if (isEnv(Env.Production)) {
        logLevelsDefault = ["error", "warn"]
        opts = { logger: logLevelsDefault }
    } else {
        opts = { logger: logLevelsDefault }
    }
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        opts
    );

    MessageComponent.init();
    const configService = app.get(ConfigService);
    const port = String(configService.get("PORT") ?? 3000)

    if (!isEnv(Env.Production)) {
        app.enableCors();

        const config = new DocumentBuilder()
            .setTitle("Nest API")
            .setDescription("Nest base")
            .setVersion("1.0")
            .addBearerAuth()
            .addServer(`http://localhost:${port}`)
            .build();

        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup("docs", app, document)

        useRequestLogging(app, 0);
    } else {
        useRequestLogging(app, 150);
    }

    app.useGlobalPipes(new ValidationPipe422({ whitelist: true }))
    app.useGlobalGuards(new RolesGuard(new Reflector()))


    app.useLogger(LoggerModule.LogLevel(configService.get("logLevel")))
    if (!process.env.TZ) {
        process.env.TZ = "Asia/Ho_Chi_Minh"
    }
    await app.listen(port, "0.0.0.0");

    console.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
