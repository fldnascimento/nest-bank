import { Inject, Injectable } from '@nestjs/common';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { BankAccountService } from 'src/domain/bank-account/interfaces/services/bank-account.service';

@Injectable()
export class GetBankAccountUseCase {
  constructor(
    @Inject('BankAccountService')
    private readonly bankAccountService: BankAccountService,
  ) {}

  async execute(bankAccountId: string): Promise<BankAccountEntity> {
    return this.bankAccountService.getAccountById(bankAccountId);
  }
}
