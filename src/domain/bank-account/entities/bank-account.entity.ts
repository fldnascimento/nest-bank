import { Entity } from '@domain/common/domain/entity';
import { TransactionEntity } from './transaction.entity';
import { randomUUID } from 'node:crypto';

type BankAccountProps = {
  accountNumber: string;
  balance: number;
  isActive: boolean;
  clientId: string;
  transactions?: TransactionEntity[];
};

export class BankAccountEntity extends Entity<BankAccountProps> {
  constructor(props: BankAccountProps, id?: string) {
    super(props, id);
  }

  static new(props: Omit<BankAccountProps, 'transactions' | 'accountNumber'>) {
    return new BankAccountEntity(
      {
        ...props,
        accountNumber: randomUUID().split('-')[0],
        transactions: [],
        balance: props?.balance || 0,
        isActive: props?.isActive || true,
      },
      randomUUID(),
    );
  }

  get id(): string {
    return this._id;
  }

  get accountNumber(): string {
    return this._props.accountNumber;
  }

  get balance(): number {
    return this._props.balance;
  }

  get isActive(): boolean {
    return this._props.isActive;
  }

  get clientId(): string {
    return this._props.clientId;
  }

  get transactions(): TransactionEntity[] {
    return this._props.transactions;
  }

  public setActive(isActive: boolean) {
    this._props.isActive = isActive;
  }

  public deposit(amount: number) {
    if (this._props.isActive) {
      this._props.balance += amount;
      this.addTransaction(
        new TransactionEntity({
          type: 'CREDIT',
          amount: amount,
          date: new Date(),
        }),
      );
    }
  }

  public withdraw(amount: number) {
    if (this.isActive && this.balance >= amount) {
      this._props.balance -= amount;
      this.addTransaction(
        TransactionEntity.new({
          type: 'DEBIT',
          amount: amount,
        }),
      );
    }
  }

  public transfer(destinationAccount: BankAccountEntity, amount: number) {
    if (this.isActive && this.balance >= amount) {
      this._props.balance -= amount;
      destinationAccount.deposit(amount);
      this.addTransaction(
        TransactionEntity.new({
          type: 'TRANSFER',
          amount: amount,
          destinationAccount: destinationAccount,
        }),
      );
    }
  }

  private addTransaction(transaction: TransactionEntity) {
    this._props.transactions.push(transaction);
  }

  public setTransactions(transactions: TransactionEntity[]) {
    this._props.transactions = transactions;
  }
}
