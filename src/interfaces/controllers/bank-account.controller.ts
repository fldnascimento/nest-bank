import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBankAccountDto } from 'src/application/bank-account/dto/create-bank-account.dto';
import { DepositDto } from 'src/application/bank-account/dto/deposit.dto';
import { WithdrawDto } from 'src/application/bank-account/dto/withdraw.dto';
import { CreateBankAccountUseCase } from 'src/application/bank-account/usecases/create-bank-account.usecase';
import { DepositUseCase } from 'src/application/bank-account/usecases/deposit.usecase';
import { GetBankAccountUseCase } from 'src/application/bank-account/usecases/get-bank-account.usecase';
import { WithdrawUseCase } from 'src/application/bank-account/usecases/withdraw.usecase';

@Controller('bank-account')
export class BankAccountController {
  constructor(
    private readonly createBankAccountUseCase: CreateBankAccountUseCase,
    private readonly depositUseCase: DepositUseCase,
    private readonly withdrawUseCase: WithdrawUseCase,
    private readonly getBankAccountUseCase: GetBankAccountUseCase,
  ) {}

  @Get(':id')
  getHello(@Param('id') id: string) {
    return this.getBankAccountUseCase.execute(id);
  }

  @Post()
  createBankAccount(@Body() body: CreateBankAccountDto) {
    return this.createBankAccountUseCase.execute(body);
  }

  @Post('deposit')
  deposit(@Body() body: DepositDto) {
    return this.depositUseCase.execute(body);
  }

  @Post('withdraw')
  withdraw(@Body() body: WithdrawDto) {
    return this.withdrawUseCase.execute(body);
  }
}
