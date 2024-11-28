import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DepositUseCase } from '@application/bank-account/usecases/deposit.usecase';
import { WithdrawUseCase } from '@application/bank-account/usecases/withdraw.usecase';
import { DepositDto } from '@application/bank-account/dto/deposit.dto';
import { WithdrawDto } from '@application/bank-account/dto/withdraw.dto';
import { TransferUseCase } from '@application/bank-account/usecases/transfer.usecase';
import { TransferDto } from '@application/bank-account/dto/transfer.dto';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly depositUseCase: DepositUseCase,
    private readonly withdrawUseCase: WithdrawUseCase,
    private readonly transferUseCase: TransferUseCase,
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

  @Post('transfer')
  @ApiOperation({
    summary: 'Realiza uma transferência entre contas',
  })
  transfer(@Body() body: TransferDto) {
    return this.transferUseCase.execute(body);
  }
}
