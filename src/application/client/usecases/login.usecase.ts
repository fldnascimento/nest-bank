import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@domain/common/application/usecase';
import { AuthService } from '@domain/common/auth/interfaces/services/auth.service';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { LoginDto } from '@application/client/dto/login.dto';

@Injectable()
export class LoginUseCase implements UseCase<LoginDto, ClientEntity> {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {}

  async execute(login: LoginDto): Promise<ClientEntity> {
    return this.authService.login(login.user);
  }
}
