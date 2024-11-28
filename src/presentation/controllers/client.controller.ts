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
    summary: 'Consulta cliente por ID',
  })
  getHello(@Param('id') id: string) {
    return this.getClientUseCase.execute(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria cliente ',
    description:
      'Para criar um novo cliente é necessário um CPF válido. </br> Use esse site para gerar um CPF: 👉🏽 <a href="https://www.4devs.com.br/gerador_de_cpf" target="_blank">Gerar CPF</a>',
  })
  createClient(@Body() body: CreateClientDto) {
    return this.createClientUseCase.execute(body);
  }
}
