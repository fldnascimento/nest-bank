import { Inject, Injectable } from '@nestjs/common';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { ClientService } from '@domain/client/interfaces/services/client.service';
import { UseCase } from '@domain/common/application/usecase';
import { CreateClientDto } from '../dto/create-client.dto';

@Injectable()
export class CreateClientUseCase
  implements UseCase<CreateClientDto, ClientEntity>
{
  constructor(
    @Inject('ClientService')
    private readonly clientService: ClientService,
  ) {}

  async execute(clientDto: CreateClientDto): Promise<ClientEntity> {
    return this.clientService.createClient(ClientEntity.new(clientDto));
  }
}
