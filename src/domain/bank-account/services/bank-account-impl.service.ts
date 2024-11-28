import { Inject, Injectable } from '@nestjs/common';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { BankAccountNotFoundException } from '@domain/bank-account/exceptions/bank-account-not-found.exception';
import { AmountMustBePositiveException } from '@domain/bank-account/exceptions/amount-must-be-positive.exception';
import { BalanceInsufficientException } from '@domain/bank-account/exceptions/balance-insufficient.exception';
import { BankAccountRepository } from '@domain/bank-account/interfaces/repositories/bank-account.repository';
import { BankAccountService } from '@domain/bank-account/interfaces/services/bank-account.service';
import { TransferToTheSameAccountException } from '@domain/bank-account/exceptions/transfer-to-the-same-account.exception';

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
    const account = await this.accountRepository.findByIdWithTransactions(id);
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

  async updateActive(
    accountNumber: string,
    status: boolean,
  ): Promise<BankAccountEntity> {
    const account = await this.getAccountByNumber(accountNumber);
    account.setActive(status);
    await this.accountRepository.update(account);

    return account;
  }

  async transfer(
    fromAccountNumber: string,
    toAccountNumber: string,
    amount: number,
  ): Promise<BankAccountEntity> {
    if (amount < 0) {
      throw new AmountMustBePositiveException();
    }

    if (fromAccountNumber === toAccountNumber) {
      throw new TransferToTheSameAccountException();
    }

    const fromAccount =
      await this.accountRepository.findByAccountNumberWithDestinactionAccount(
        fromAccountNumber,
      );

    if (!fromAccount) {
      throw new BankAccountNotFoundException(
        `Conta origem ${fromAccountNumber} não encontrada`,
      );
    }

    const toAccount =
      await this.accountRepository.findByAccountNumber(toAccountNumber);

    if (!toAccount) {
      throw new BankAccountNotFoundException(
        `Conta destino ${toAccountNumber} não encontrada`,
      );
    }

    if (fromAccount.balance < amount) {
      throw new BalanceInsufficientException();
    }

    fromAccount.transfer(toAccount, amount);
    await this.accountRepository.update(fromAccount);
    await this.accountRepository.update(toAccount);

    return fromAccount;
  }
}
