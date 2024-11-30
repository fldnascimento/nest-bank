import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@domain/common/auth/interfaces/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AuthService')
    private authService: AuthService,
  ) {
    super({ usernameField: 'cpf' });
  }

  validate(cpf: string, password: string) {
    return this.authService.validateClient(cpf, password);
  }
}
