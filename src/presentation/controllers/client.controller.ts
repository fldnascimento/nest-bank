import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateClientDto } from '@application/client/dto/create-client.dto';
import { CreateClientUseCase } from '@application/client/usecases/create-client.usecase';
import { GetClientUseCase } from '@application/client/usecases/get-client.usecase';
import { CreateClientSwagger } from '@presentation/swagger/client/create-client.swagger';
import { GetClientSwagger } from '@presentation/swagger/client/get-client.swagger';

@Controller('client')
export class ClientController {
  constructor(
    private readonly getClientUseCase: GetClientUseCase,
    private readonly createClientUseCase: CreateClientUseCase,
  ) {}

  @Get(':id')
  @GetClientSwagger()
  getHello(@Param('id') id: string) {
    return this.getClientUseCase.execute(id);
  }

  @Post()
  @CreateClientSwagger()
  createClient(@Body() body: CreateClientDto) {
    return this.createClientUseCase.execute(body);
  }
}
