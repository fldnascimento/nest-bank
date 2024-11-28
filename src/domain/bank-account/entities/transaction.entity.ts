import { Entity } from 'src/domain/common/domain/entity';
import { BankAccountEntity } from './bank-account.entity';

export const transactionsTypes = ['CREDIT', 'DEBIT', 'TRANSFER'] as const;
export type TransactionType = (typeof transactionsTypes)[number];

type TransactionProps = {
  type: TransactionType;
  amount: number;
  date: Date;
  destinationAccount?: BankAccountEntity;
};

export class TransactionEntity extends Entity<TransactionProps> {
  constructor(props: TransactionProps, id?: string) {
    super(props, id);
  }

  static new(props: Omit<TransactionProps, 'date'>) {
    return new TransactionEntity({ ...props, date: new Date() });
  }

  get id(): string {
    return this._id;
  }

  get type(): TransactionType {
    return this._props.type;
  }

  get amount(): number {
    return this._props.amount;
  }

  get date(): Date {
    return this._props.date;
  }
  get destinationAccount(): BankAccountEntity | undefined {
    return this._props.destinationAccount;
  }
}
