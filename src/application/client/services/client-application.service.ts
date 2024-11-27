import { Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/domain/client/entities/client.entity';
import { ClientService } from 'src/domain/client/services/client.service';

@Injectable()
export class ClientApplicationService {
  constructor(private readonly clientService: ClientService) {}

  async createClient(client: ClientEntity): Promise<void> {
    await this.clientService.createClient(client);
  }

  async getClient(id: string): Promise<ClientEntity | null> {
    return this.clientService.getClient(id);
  }
}
