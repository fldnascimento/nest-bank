import { Injectable } from '@nestjs/common';
import { BankAccountService } from 'src/domain/bank-account/services/bank-account.service';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';

@Injectable()
export class GetBankAccountUseCase {
  constructor(private readonly bankAccountService: BankAccountService) {}

  async execute(bankAccountId: string): Promise<BankAccountEntity> {
    return this.bankAccountService.getAccountById(bankAccountId);
  }
}
