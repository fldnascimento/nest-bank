import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateClientDto } from '@application/client/dto/create-client.dto';
import { CreateClientUseCase } from '@application/client/usecases/create-client.usecase';
import { GetClientUseCase } from '@application/client/usecases/get-client.usecase';
import { CreateClientSwagger } from '@presentation/swagger/client/create-client.swagger';
import { GetClientSwagger } from '@presentation/swagger/client/get-client.swagger';
import { LoginDto } from '@application/client/dto/login.dto';
import { LoginUseCase } from '@application/client/usecases/login.usecase';
import { IsPublic } from '@domain/common/auth/decorators/is-public.decorator';
import { LocalAuthGuard } from '@domain/common/auth/guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginSwagger } from '@presentation/swagger/client/login.swagger';

@ApiTags('Client')
@Controller({ path: 'client', version: '1' })
export class ClientController {
  constructor(
    private readonly getClientUseCase: GetClientUseCase,
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Get(':id')
  @GetClientSwagger()
  getHello(@Param('id') id: string) {
    return this.getClientUseCase.execute(id);
  }

  @IsPublic()
  @Post()
  @CreateClientSwagger()
  createClient(@Body() body: CreateClientDto) {
    return this.createClientUseCase.execute(body);
  }

  @IsPublic()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @LoginSwagger()
  @HttpCode(HttpStatus.OK)
  login(@Request() body: LoginDto) {
    return this.loginUseCase.execute(body);
  }
}
