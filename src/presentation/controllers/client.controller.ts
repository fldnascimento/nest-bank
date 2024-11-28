import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateClientDto } from '@application/client/dto/create-client.dto';
import { CreateClientUseCase } from '@application/client/usecases/create-client.usecase';
import { GetClientUseCase } from '@application/client/usecases/get-client.usecase';

@Controller('client')
export class ClientController {
  constructor(
    private readonly getClientUseCase: GetClientUseCase,
    private readonly createClientUseCase: CreateClientUseCase,
  ) {}

  @Get(':id')
  @ApiOperation({
    summary: 'API para buscar cliente por ID',
  })
  getHello(@Param('id') id: string) {
    return this.getClientUseCase.execute(id);
  }

  @Post()
  @ApiOperation({
    summary: 'API para cadastrar cliente',
  })
  createClient(@Body() body: CreateClientDto) {
    return this.createClientUseCase.execute(body);
  }
}
