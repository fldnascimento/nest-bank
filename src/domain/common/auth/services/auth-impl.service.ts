import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@domain/common/auth/interfaces/services/auth.service';
import { ClientRepository } from '@domain/client/interfaces/repositories/client.repository';
import { ClientTokenEntity } from '@domain/client/entities/client-token.entity';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { ClientPayloadValueObject } from '@domain/common/auth/value-objects/client-payload.value-object';
import { UnauthorizedException } from '@domain/common/auth/exceptions/unauthorized.exception';

@Injectable()
export class AuthImplService implements AuthService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(client: ClientEntity): Promise<ClientTokenEntity> {
    const payload: ClientPayloadValueObject = {
      sub: client.id,
      cpf: client.cpf,
      fullName: client.fullName,
    };

    const token = this.jwtService.sign(payload);

    const clientToken = ClientTokenEntity.new(
      {
        cpf: client.cpf,
        fullName: client.fullName,
        token: token,
        password: undefined,
        birthDate: client?.birthDate,
      },
      client.id,
    );

    return clientToken;
  }

  async validateClient(cpf: string, password: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findByCpf(cpf);
    if (client) {
      const isPasswordValid = await bcrypt.compare(password, client.password);

      if (isPasswordValid) {
        client.setPassword(undefined);
        return client;
      }
    }

    throw new UnauthorizedException();
  }
}
