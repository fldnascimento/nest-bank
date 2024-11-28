import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateClientDto } from 'src/application/client/dto/create-client.dto';
import { ClientApplicationService } from 'src/application/client/usecases/client-application.service';
import { CreateClientUseCase } from 'src/application/client/usecases/create-client.usecase';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientApplicationService: ClientApplicationService,
    private readonly createClientUseCase: CreateClientUseCase,
  ) {}

  @Get(':id')
  getHello(@Param('id') id: string) {
    return this.clientApplicationService.getClient(id);
  }

  @Post()
  createClient(@Body() body: CreateClientDto) {
    return this.createClientUseCase.execute(body);
  }
}
