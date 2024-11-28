import { Injectable } from '@nestjs/common';
import { BankAccountService } from 'src/domain/bank-account/services/bank-account.service';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { WithdrawDto } from '../dto/withdraw.dto';

@Injectable()
export class WithdrawUseCase {
  constructor(private readonly bankAccountService: BankAccountService) {}

  async execute(withdrawDto: WithdrawDto): Promise<BankAccountEntity> {
    return this.bankAccountService.withdraw(
      withdrawDto.accountNumber,
      withdrawDto.amount,
    );
  }
}
