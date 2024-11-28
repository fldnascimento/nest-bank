import { Repo } from 'src/domain/common/domain/repo';
import { BankAccountEntity } from '../../entities/bank-account.entity';

export interface BankAccountRepository extends Repo<BankAccountEntity> {
  update(bankAccount: BankAccountEntity): Promise<void>;
  findByAccountNumber(accountNumber: string): Promise<BankAccountEntity | null>;
}
