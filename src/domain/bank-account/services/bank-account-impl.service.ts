import { Inject, Injectable } from '@nestjs/common';
import { BankAccountEntity } from '../entities/bank-account.entity';
import { BankAccountNotFoundException } from 'src/domain/bank-account/exceptions/bank-account-not-found.exception';
import { AmountMustBePositiveException } from 'src/domain/bank-account/exceptions/amount-must-be-positive.exception';
import { BalanceInsufficientException } from 'src/domain/bank-account/exceptions/balance-insufficient.exception';
import { BankAccountRepository } from '../interfaces/repositories/bank-account.repository';
import { BankAccountService } from '../interfaces/services/bank-account.service';

@Injectable()
export class BankAccountImplService implements BankAccountService {
  constructor(
    @Inject('BankAccountRepository')
    private readonly accountRepository: BankAccountRepository,
  ) {}

  async createAccount(account: BankAccountEntity): Promise<BankAccountEntity> {
    return this.accountRepository.save(account);
  }

  async getAccountById(id: string): Promise<BankAccountEntity> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new BankAccountNotFoundException();
    }
    return account;
  }

  async getAccountByNumber(accountNumber: string): Promise<BankAccountEntity> {
    const account =
      await this.accountRepository.findByAccountNumber(accountNumber);
    if (!account) {
      throw new BankAccountNotFoundException();
    }
    return account;
  }

  async deposit(
    accountNumber: string,
    amount: number,
  ): Promise<BankAccountEntity> {
    const account = await this.getAccountByNumber(accountNumber);

    if (amount < 0) {
      throw new AmountMustBePositiveException();
    }

    account.deposit(amount);
    await this.accountRepository.update(account);

    return account;
  }

  async withdraw(
    accountNumber: string,
    amount: number,
  ): Promise<BankAccountEntity> {
    const account = await this.getAccountByNumber(accountNumber);
    if (amount < 0) {
      throw new AmountMustBePositiveException();
    }

    if (account.balance < amount) {
      throw new BalanceInsufficientException();
    }

    account.withdraw(amount);
    await this.accountRepository.update(account);

    return account;
  }
}
