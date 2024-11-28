import { Inject, Injectable } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientEntity } from 'src/domain/client/entities/client.entity';
import { ClientService } from 'src/domain/client/interfaces/services/client.service';
import { UseCase } from 'src/domain/common/application/usecase';

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
