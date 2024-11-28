import { Injectable } from '@nestjs/common';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { ClientRepository } from '@domain/client/interfaces/repositories/client.repository';
import { ClientModel } from '@infrastructure/database/models/client.model';
import { ClientMapper } from '@infrastructure/mappers/client.mapper';

@Injectable()
export class ClientImplRepository implements ClientRepository {
  constructor(private readonly clientMapper: ClientMapper) {}

  async save(client: ClientEntity): Promise<ClientEntity> {
    const clientData = this.clientMapper.toModel(client);
    const clientModel = await ClientModel.create(clientData.toJSON());
    return this.clientMapper.toEntity(clientModel);
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

  async findByCpf(cpf: string): Promise<ClientEntity | null> {
    const client = await ClientModel.findOne({
      where: { cpf },
    });

    if (!client) {
      return null;
    }
    return this.clientMapper.toEntity(client);
  }
}
