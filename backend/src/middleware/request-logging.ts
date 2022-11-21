import morgan from "morgan";

// middleware/request-logging.ts
import { Logger } from "@nestjs/common";
import { NestFastifyApplication } from "@nestjs/platform-fastify";

export function useRequestLogging(app: NestFastifyApplication, minTime = 150): void {
    const logger = new Logger("Request");
    app.use(
        morgan("tiny", {
            stream: {
                write: message => {
                    const mes = message.split(" ")
                    const httpCode = mes.length - 5 > 0 ? parseInt(mes[mes.length - 5]) : 0
                    const time = mes.length - 2 > 0 ? parseFloat(mes[mes.length - 2]) : 0
                    if (time > minTime) {
                        switch (true) {
                            case httpCode > 201:
                                logger.error(message.replace("\n", ""))
                                break
                            default:
                                logger.log(message.replace("\n", ""))

                        }
                    }
                },
            },
        }),
    );
}