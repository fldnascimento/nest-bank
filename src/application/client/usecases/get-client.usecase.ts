import { Inject, Injectable } from '@nestjs/common';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { ClientService } from '@domain/client/interfaces/services/client.service';
import { UseCase } from '@domain/common/application/usecase';

@Injectable()
export class GetClientUseCase implements UseCase<string, ClientEntity> {
  constructor(
    @Inject('ClientService')
    private readonly clientService: ClientService,
  ) {}

  async execute(clientId: string): Promise<ClientEntity> {
    return this.clientService.getClient(clientId);
  }
}
