import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { BankAccountService } from 'src/domain/bank-account/services/bank-account.service';

@Injectable()
export class BankAccountApplicationService {
  constructor(private readonly bankAccountService: BankAccountService) {}

  async createBankAccount(clientId: string): Promise<void> {
    const bankAccount = BankAccountEntity.new({
      accountNumber: randomUUID().split('-')[0],
      clientId,
    });
    await this.bankAccountService.createAccount(bankAccount);
  }

  async deposit(
    bankAccountId: string,
    amount: number,
  ): Promise<BankAccountEntity> {
    return this.bankAccountService.deposit(bankAccountId, amount);
  }

  async withdraw(
    bankAccountId: string,
    amount: number,
  ): Promise<BankAccountEntity> {
    return this.bankAccountService.withdraw(bankAccountId, amount);
  }

  async getAccountById(id: string): Promise<BankAccountEntity> {
    return this.bankAccountService.getAccountById(id);
  }
}
