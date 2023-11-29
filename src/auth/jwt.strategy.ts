import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";

config(); // Carga las variables de entorno desde el archivo .env

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username }
    }
}