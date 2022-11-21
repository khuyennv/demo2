import { TokenDto } from "src/dtos/token.dto";

import {
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const headers = request.headers as unknown as Record<string, unknown>

        return new TokenDto({
            userId: headers["x-fjob-user-id"] ? parseInt(headers["x-fjob-user-id"] as string) : 0,
            userCode: headers["x-fjob-user-code"] ?? "",
            role: headers["x-fjob-role"] ?? "",
            lang: headers["x-fjob-lang"] ?? "vi",
            apiKey: headers["x-fjob-pai-key"] ?? "",
        });
    },
);