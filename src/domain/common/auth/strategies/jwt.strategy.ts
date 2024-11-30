import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClientFromJwtValueObject } from '@domain/common/auth/value-objects/client-from-jwt.value-object';
import { ClientPayloadValueObject } from '@domain/common/auth/value-objects/client-payload.value-object';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(
    payload: ClientPayloadValueObject,
  ): Promise<ClientFromJwtValueObject> {
    return {
      id: payload.sub,
      cpf: payload.cpf,
      fullName: payload.fullName,
    };
  }
}
