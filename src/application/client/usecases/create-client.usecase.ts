import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/domain/client/services/client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientEntity } from 'src/domain/client/entities/client.entity';

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute(clientDto: CreateClientDto): Promise<ClientEntity> {
    return this.clientService.createClient(ClientEntity.new(clientDto));
  }
}
