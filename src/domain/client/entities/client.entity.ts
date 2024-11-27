import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { Entity } from 'src/domain/common/domain/entity';

export class ClientEntity extends Entity {
  private _fullName: string;
  private _cpf: string;
  private _birthDate: Date;
  private _bankAccounts: BankAccountEntity[] = [];

  constructor(id: string, fullName: string, cpf: string, birthDate: Date) {
    super(id);
    this.setFullName(fullName);
    this.setCpf(cpf);
    this.setBirthDate(birthDate);
  }

  get id(): string {
    return this._id;
  }

  get fullName(): string {
    return this._fullName;
  }

  get cpf(): string {
    return this._cpf;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  get accounts(): BankAccountEntity[] {
    return this._bankAccounts;
  }

  // Setters
  setFullName(fullName: string): void {
    if (!fullName || fullName.trim().length < 3) {
      throw new Error('Full name must be at least 3 characters long.');
    }
    this._fullName = fullName.trim();
  }

  setCpf(cpf: string): void {
    if (!this.isValidCpf(cpf)) {
      throw new Error('Invalid CPF.');
    }
    this._cpf = cpf;
  }

  setBirthDate(birthDate: Date): void {
    const now = new Date();
    if (birthDate > now) {
      throw new Error('Birth date cannot be in the future.');
    }
    this._birthDate = birthDate;
  }

  // Domain Behavior
  addBankAccount(bankAccount: BankAccountEntity): void {
    if (this._bankAccounts.some((acc) => acc.id === bankAccount.id)) {
      throw new Error('Bank account already exists for this client.');
    }
    this._bankAccounts.push(bankAccount);
  }

  removeBankAccount(accountId: string): void {
    this._bankAccounts = this._bankAccounts.filter(
      (acc) => acc.id !== accountId,
    );
  }

  private isValidCpf(cpf: string): boolean {
    return cpf.length === 11;
  }
}
