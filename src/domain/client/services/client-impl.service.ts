import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { ClientRepository } from '@domain/client/interfaces/repositories/client.repository';
import { ClientNotFoundException } from '@domain/client/exceptions/client-not-found.exception';
import { ClientAlreadyExistsException } from '@domain/client/exceptions/client-already-exists.exception';
import { ClientService } from '@domain/client/interfaces/services/client.service';

@Injectable()
export class ClientImplService implements ClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
  ) {}

  async createClient(client: ClientEntity): Promise<ClientEntity> {
    const clientExists = await this.clientRepository.findByCpf(client.cpf);
    if (clientExists) {
      throw new ClientAlreadyExistsException();
    }
    const passwordHash = await bcrypt.hash(client.password, 10);
    client.setPassword(passwordHash);
    const newClient = await this.clientRepository.save(client);
    newClient.setPassword(undefined);
    return newClient;
  }

  async getClient(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new ClientNotFoundException();
    }
    return client;
  }
}
