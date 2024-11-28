import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DepositUseCase } from '@application/bank-account/usecases/deposit.usecase';
import { WithdrawUseCase } from '@application/bank-account/usecases/withdraw.usecase';
import { DepositDto } from '@application/bank-account/dto/deposit.dto';
import { WithdrawDto } from '@application/bank-account/dto/withdraw.dto';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly depositUseCase: DepositUseCase,
    private readonly withdrawUseCase: WithdrawUseCase,
  ) {}

  @Post('deposit')
  @ApiOperation({
    summary: 'Realiza um depósito em uma conta',
  })
  deposit(@Body() body: DepositDto) {
    return this.depositUseCase.execute(body);
  }

  @Post('withdraw')
  @ApiOperation({
    summary: 'Realiza um saque em uma conta',
  })
  withdraw(@Body() body: WithdrawDto) {
    return this.withdrawUseCase.execute(body);
  }
}
