import { Repo } from 'src/domain/common/infrastructure/repo';
import { BankAccountEntity } from '../entities/bank-account.entity';

export interface BankAccountRepository extends Repo<BankAccountEntity> {
  save(bankAccount: BankAccountEntity): Promise<BankAccountEntity>;
  findById(id: string): Promise<BankAccountEntity | null>;
  update(bankAccount: BankAccountEntity): Promise<void>;
  findByAccountNumber(accountNumber: string): Promise<BankAccountEntity | null>;
}
