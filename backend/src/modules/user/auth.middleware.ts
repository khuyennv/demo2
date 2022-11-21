import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  Injectable,
  NestMiddleware,
} from "@nestjs/common";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: FastifyRequest, res: FastifyReply, next: (error?: Error) => void): void {
        try {
            next()
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}