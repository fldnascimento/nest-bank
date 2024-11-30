import { Body, Controller, Post } from '@nestjs/common';
import { DepositUseCase } from '@application/bank-account/usecases/deposit.usecase';
import { WithdrawUseCase } from '@application/bank-account/usecases/withdraw.usecase';
import { DepositDto } from '@application/bank-account/dto/deposit.dto';
import { WithdrawDto } from '@application/bank-account/dto/withdraw.dto';
import { TransferUseCase } from '@application/bank-account/usecases/transfer.usecase';
import { TransferDto } from '@application/bank-account/dto/transfer.dto';
import { DepositSwagger } from '@presentation/swagger/transaction/deposit.swagger';
import { WithdrawSwagger } from '@presentation/swagger/transaction/withdraw.swagger';
import { TransferSwagger } from '@presentation/swagger/transaction/transfer.swagger';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Transaction')
@Controller({ path: 'transaction', version: '1' })
export class TransactionController {
  constructor(
    private readonly depositUseCase: DepositUseCase,
    private readonly withdrawUseCase: WithdrawUseCase,
    private readonly transferUseCase: TransferUseCase,
  ) {}

  @Post('deposit')
  @DepositSwagger()
  deposit(@Body() body: DepositDto) {
    return this.depositUseCase.execute(body);
  }

  @Post('withdraw')
  @WithdrawSwagger()
  withdraw(@Body() body: WithdrawDto) {
    return this.withdrawUseCase.execute(body);
  }

  @Post('transfer')
  @TransferSwagger()
  transfer(@Body() body: TransferDto) {
    return this.transferUseCase.execute(body);
  }
}
