import { Inject, Injectable } from '@nestjs/common';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { WithdrawDto } from '../dto/withdraw.dto';
import { BankAccountService } from 'src/domain/bank-account/interfaces/services/bank-account.service';
import { UseCase } from 'src/domain/common/application/usecase';

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
