import { Entity } from 'src/domain/common/domain/entity';

export class BankAccountEntity extends Entity {
  private _accountNumber: string;
  private _balance: number;
  private _isActive: boolean;
  private _clientId: string;

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
    }
  }

  withdraw(amount: number) {
    if (this.isActive && this.balance >= amount) {
      this._balance -= amount;
    }
  }

  transfer(destinationAccount: BankAccountEntity, amount: number) {
    if (this.isActive && this.balance >= amount) {
      this._balance -= amount;
      destinationAccount.deposit(amount);
    }
  }
}
