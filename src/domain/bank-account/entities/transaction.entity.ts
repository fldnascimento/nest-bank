import { Entity } from 'src/domain/common/domain/entity';
import { BankAccountEntity } from './bank-account.entity';

export const transactionsTypes = ['CREDIT', 'DEBIT', 'TRANSFER'] as const;
export type TransactionType = (typeof transactionsTypes)[number];

export class TransactionEntity extends Entity {
  private _type: TransactionType;
  private _amount: number;
  private _timestamp: Date;
  private _destinationAccount?: BankAccountEntity;

  constructor(
    type: TransactionType,
    amount: number,
    destinationAccount?: BankAccountEntity,
  ) {
    super();
    this._type = type;
    this._amount = amount;
    this._timestamp = new Date();
    this._destinationAccount = destinationAccount;
  }

  get id(): string {
    return this._id;
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
