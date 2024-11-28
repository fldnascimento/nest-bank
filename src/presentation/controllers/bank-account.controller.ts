import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateBankAccountDto } from '@application/bank-account/dto/create-bank-account.dto';
import { CreateBankAccountUseCase } from '@application/bank-account/usecases/create-bank-account.usecase';
import { GetBankAccountUseCase } from '@application/bank-account/usecases/get-bank-account.usecase';
import { UpdateBankAccountDto } from '@application/bank-account/dto/update-bank-account.dto';
import { UpdateBankAccountUseCase } from '@application/bank-account/usecases/update-bank-account.usecase';

@Controller('bank-account')
export class BankAccountController {
  constructor(
    private readonly createBankAccountUseCase: CreateBankAccountUseCase,
    private readonly getBankAccountUseCase: GetBankAccountUseCase,
    private readonly updateBankAccountUseCase: UpdateBankAccountUseCase,
  ) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Consulta conta bancária por ID',
  })
  getHello(@Param('id') id: string) {
    return this.getBankAccountUseCase.execute(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria conta bancária',
  })
  createBankAccount(@Body() body: CreateBankAccountDto) {
    return this.createBankAccountUseCase.execute(body);
  }

  @Put()
  @ApiOperation({
    summary: 'Atualiza o status da conta bancária',
  })
  updateBankAccount(@Body() body: UpdateBankAccountDto) {
    return this.updateBankAccountUseCase.execute(body);
  }
}
