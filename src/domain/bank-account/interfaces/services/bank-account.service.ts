import { Service } from '@domain/common/domain/service';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';

export interface BankAccountService extends Service {
  createAccount(bankAccount: BankAccountEntity): Promise<BankAccountEntity>;
  getAccountById(id: string): Promise<BankAccountEntity | null>;
  getAccountByNumber(id: string): Promise<BankAccountEntity | null>;
  deposit(accountNumber: string, amount: number): Promise<BankAccountEntity>;
  withdraw(accountNumber: string, amount: number): Promise<BankAccountEntity>;
}
