import { Entity } from 'src/domain/common/domain/entity';
import { TransactionEntity } from './transaction.entity';

export class BankAccountEntity extends Entity {
  private _accountNumber: string;
  private _balance: number;
  private _isActive: boolean;
  private _clientId: string;
  private _transactions: TransactionEntity[] = [];

  constructor(
    id: string,
    accountNumber: string,
    clientId: string,
    balance: number = 0,
    isActive: boolean = true,
  ) {
    super(id);
    this._accountNumber = accountNumber;
    this._balance = balance;
    this._isActive = isActive;
    this._clientId = clientId;
  }

  get id(): string {
    return this._id;
  }

  get accountNumber(): string {
    return this._accountNumber;
  }

  get balance(): number {
    return this._balance;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get clientId(): string {
    return this._clientId;
  }

  deposit(amount: number) {
    if (this._isActive) {
      this._balance += amount;
      this.addTransaction(new TransactionEntity('CREDIT', amount));
    }
  }

  withdraw(amount: number) {
    if (this.isActive && this.balance >= amount) {
      this._balance -= amount;
      this.addTransaction(new TransactionEntity('DEBIT', amount));
    }
  }

  transfer(destinationAccount: BankAccountEntity, amount: number) {
    if (this.isActive && this.balance >= amount) {
      this._balance -= amount;
      destinationAccount.deposit(amount);
      this.addTransaction(
        new TransactionEntity('TRANSFER', amount, destinationAccount),
      );
    }
  }

  private addTransaction(transaction: TransactionEntity) {
    this._transactions.push(transaction);
  }
}
