import { Inject, Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/domain/client/entities/client.entity';
import { ClientService } from 'src/domain/client/interfaces/services/client.service';
import { UseCase } from 'src/domain/common/application/usecase';

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
