import { Injectable } from '@nestjs/common';
import { ClientModel } from '../database/models/client.model';
import { ClientMapper } from '../mappers/client.mapper';
import { ClientRepository } from 'src/domain/client/repositories/client.repository';
import { ClientEntity } from 'src/domain/client/entities/client.entity';

@Injectable()
export class ClientImplRepository implements ClientRepository {
  constructor(private readonly clientMapper: ClientMapper) {}
  async save(client: ClientEntity): Promise<void> {
    const clientData = this.clientMapper.toModel(client);

    await ClientModel.create({ ...clientData });
  }

  async findById(id: string): Promise<ClientEntity | null> {
    const client = await ClientModel.findByPk(id, {
      include: ['accounts'],
    });

    if (!client) {
      return null;
    }
    return this.clientMapper.toEntity(client);
  }
}
