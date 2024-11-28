import { BankAccountEntity } from '../../entities/bank-account.entity';
import { Service } from 'src/domain/common/domain/service';

export interface BankAccountService extends Service {
  createAccount(bankAccount: BankAccountEntity): Promise<BankAccountEntity>;
  getAccountById(id: string): Promise<BankAccountEntity | null>;
  getAccountByNumber(id: string): Promise<BankAccountEntity | null>;
  deposit(accountNumber: string, amount: number): Promise<BankAccountEntity>;
  withdraw(accountNumber: string, amount: number): Promise<BankAccountEntity>;
}
