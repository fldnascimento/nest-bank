import { BankAccountEntity } from '../entities/bank-account.entity';

export const transactionsTypes = ['CREDIT', 'DEBIT', 'TRANSFER'] as const;
export type TransactionType = (typeof transactionsTypes)[number];

export class TransactionValueObject {
  private _type: TransactionType;
  private _amount: number;
  private _timestamp: Date;
  private _destinationAccount?: BankAccountEntity;

  constructor(
    type: TransactionType,
    amount: number,
    destinationAccount?: BankAccountEntity,
  ) {
    this._type = type;
    this._amount = amount;
    this._timestamp = new Date();
    this._destinationAccount = destinationAccount;
  }

  get type(): TransactionType {
    return this._type;
  }

  get amount(): number {
    return this._amount;
  }

  get timestamp(): Date {
    return this._timestamp;
  }
  get destinationAccount(): BankAccountEntity | undefined {
    return this._destinationAccount;
  }
}
