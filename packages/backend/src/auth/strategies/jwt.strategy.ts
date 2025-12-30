import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrkey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any | string) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
