import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { BankAccountService } from 'src/domain/bank-account/services/bank-account.service';

@Injectable()
export class BankAccountApplicationService {
  constructor(private readonly bankAccountService: BankAccountService) {}

  async createBankAccount(clientId: string): Promise<void> {
    const bankAccount = new BankAccountEntity(
      randomUUID(),
      randomUUID(),
      clientId,
    );
    await this.bankAccountService.createAccount(bankAccount);
  }

  async deposit(
    bankAccountId: string,
    amount: number,
  ): Promise<BankAccountEntity> {
    const bankAccount =
      await this.bankAccountService.getAccountById(bankAccountId);
    if (!bankAccount) {
      throw new Error('Bank account not found');
    }

    bankAccount.deposit(amount);
    await this.bankAccountService.updateAccount(bankAccount);

    return bankAccount;
  }

  async withdraw(
    bankAccountId: string,
    amount: number,
  ): Promise<BankAccountEntity> {
    const bankAccount =
      await this.bankAccountService.getAccountById(bankAccountId);
    if (!bankAccount) {
      throw new Error('Bank account not found');
    }

    bankAccount.withdraw(amount);
    await this.bankAccountService.updateAccount(bankAccount);

    return bankAccount;
  }

  async getAccountById(id: string): Promise<BankAccountEntity> {
    return this.bankAccountService.getAccountById(id);
  }
}
