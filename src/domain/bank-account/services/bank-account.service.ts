import { Inject, Injectable } from '@nestjs/common';
import { BankAccountEntity } from '../entities/bank-account.entity';
import { BankAccountRepository } from '../repositories/bank-account.repository';

@Injectable()
export class BankAccountService {
  constructor(
    @Inject('BankAccountRepository')
    private readonly accountRepository: BankAccountRepository,
  ) {}

  async createAccount(account: BankAccountEntity): Promise<void> {
    return this.accountRepository.save(account);
  }

  async getAccountById(id: string): Promise<BankAccountEntity> {
    return this.accountRepository.findById(id);
  }

  async updateAccount(account: BankAccountEntity): Promise<void> {
    return this.accountRepository.update(account);
  }
}
