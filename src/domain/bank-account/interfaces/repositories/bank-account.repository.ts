import { Repo } from '@domain/common/domain/repo';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';

export interface BankAccountRepository extends Repo<BankAccountEntity> {
  update(bankAccount: BankAccountEntity): Promise<void>;
  findByAccountNumber(accountNumber: string): Promise<BankAccountEntity | null>;
  findByAccountNumberWithDestinactionAccount(
    accountNumber: string,
  ): Promise<BankAccountEntity | null>;
}
