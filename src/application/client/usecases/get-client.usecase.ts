import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/domain/client/services/client.service';
import { ClientEntity } from 'src/domain/client/entities/client.entity';

@Injectable()
export class GetClientUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute(clientId: string): Promise<ClientEntity> {
    return this.clientService.getClient(clientId);
  }
}
