import { Inject, Injectable } from '@nestjs/common';
import { ClientEntity } from '../entities/client.entity';
import { ClientRepository } from '../repositories/client.repository';
import { ClientNotFoundException } from '../exceptions/client-not-found.exception';
import { ClientAlreadyExistsException } from '../exceptions/client-already-exists.exception';

@Injectable()
export class ClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
  ) {}

  async createClient(client: ClientEntity): Promise<ClientEntity> {
    const clientExists = await this.clientRepository.findByCpf(client.cpf);
    if (clientExists) {
      throw new ClientAlreadyExistsException();
    }
    return await this.clientRepository.save(client);
  }

  async getClient(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new ClientNotFoundException();
    }
    return client;
  }
}
