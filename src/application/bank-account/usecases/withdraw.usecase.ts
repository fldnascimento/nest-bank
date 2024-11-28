import { Inject, Injectable } from '@nestjs/common';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { BankAccountService } from '@domain/bank-account/interfaces/services/bank-account.service';
import { UseCase } from '@domain/common/application/usecase';
import { WithdrawDto } from '../dto/withdraw.dto';

@Injectable()
export class WithdrawUseCase
  implements UseCase<WithdrawDto, BankAccountEntity>
{
  constructor(
    @Inject('BankAccountService')
    private readonly bankAccountService: BankAccountService,
  ) {}

  async execute(withdrawDto: WithdrawDto): Promise<BankAccountEntity> {
    return this.bankAccountService.withdraw(
      withdrawDto.accountNumber,
      withdrawDto.amount,
    );
  }
}
