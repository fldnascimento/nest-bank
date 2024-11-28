import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateClientDto } from 'src/application/client/dto/create-client.dto';
import { CreateClientUseCase } from 'src/application/client/usecases/create-client.usecase';
import { GetClientUseCase } from 'src/application/client/usecases/get-client.usecase';

@Controller('client')
export class ClientController {
  constructor(
    private readonly getClientUseCase: GetClientUseCase,
    private readonly createClientUseCase: CreateClientUseCase,
  ) {}

  @Get(':id')
  getHello(@Param('id') id: string) {
    return this.getClientUseCase.execute(id);
  }

  @Post()
  createClient(@Body() body: CreateClientDto) {
    return this.createClientUseCase.execute(body);
  }
}
