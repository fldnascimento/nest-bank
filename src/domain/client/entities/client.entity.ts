import { randomUUID } from 'crypto';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { Entity } from 'src/domain/common/domain/entity';
import { InvalidCpfException } from '../exceptions/invalid-cpf.exception';

type ClientProps = {
  fullName: string;
  cpf: string;
  birthDate: Date;
  bankAccounts?: BankAccountEntity[];
};

export class ClientEntity extends Entity<ClientProps> {
  constructor(props: ClientProps, id?: string) {
    super(props, id);
    this.setFullName(props.fullName);
    this.setCpf(props.cpf);
    this.setBirthDate(props.birthDate);
  }

  static new(props: Omit<ClientProps, 'bankAccounts'>) {
    return new ClientEntity({ ...props, bankAccounts: [] }, randomUUID());
  }

  get id(): string {
    return this._id;
  }

  get fullName(): string {
    return this._props.fullName;
  }

  get cpf(): string {
    return this._props.cpf;
  }

  get birthDate(): Date {
    return this._props.birthDate;
  }

  get accounts(): BankAccountEntity[] {
    return this._props.bankAccounts;
  }

  setFullName(fullName: string): void {
    if (!fullName || fullName.trim().length < 3) {
      throw new Error('Full name must be at least 3 characters long.');
    }
    this._props.fullName = fullName.trim();
  }

  setCpf(cpf: string): void {
    if (!this.isValidCpf(cpf)) {
      throw new InvalidCpfException();
    }
    this._props.cpf = cpf;
  }

  setBirthDate(birthDate: Date): void {
    const now = new Date();
    if (birthDate > now) {
      throw new Error('Birth date cannot be in the future.');
    }
    this._props.birthDate = birthDate;
  }

  addBankAccount(bankAccount: BankAccountEntity): void {
    if (this._props.bankAccounts.some((acc) => acc.id === bankAccount.id)) {
      throw new Error('Bank account already exists for this client.');
    }
    this._props.bankAccounts.push(bankAccount);
  }

  private isValidCpf(cpf: string): boolean {
    return cpf.length === 11;
  }
}
