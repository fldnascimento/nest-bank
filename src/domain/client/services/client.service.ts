import { Inject, Injectable } from '@nestjs/common';
import { ClientEntity } from '../entities/client.entity';
import { ClientRepository } from '../repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
  ) {}

  async createClient(client: ClientEntity): Promise<void> {
    await this.clientRepository.save(client);
  }

  async getClient(id: string): Promise<ClientEntity | null> {
    return this.clientRepository.findById(id);
  }
}
