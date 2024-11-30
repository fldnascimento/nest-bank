import { randomUUID } from 'node:crypto';
import { Entity } from '@domain/common/domain/entity';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { InvalidCpfException } from '@domain/client/exceptions/invalid-cpf.exception';
import { InvalidFullNameException } from '@domain/client/exceptions/invalid-full-name.exception';
import { InvalidBirthDateException } from '@domain/client/exceptions/invalid-birth-date.exception';
import { BirthDateValueObject } from '@domain/client/value-objects/birth-date.value-object';

export type ClientProps = {
  fullName: string;
  cpf: string;
  birthDate: BirthDateValueObject;
  password?: string;
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

  get password(): string {
    return this._props.password;
  }

  setPassword(password: string) {
    this._props.password = password;
  }

  setFullName(fullName: string): void {
    if (!fullName || fullName.trim().length < 3) {
      throw new InvalidFullNameException();
    }
    this._props.fullName = fullName.trim();
  }

  setCpf(cpf: string): void {
    cpf = cpf.replace(/[^0-9]/g, '');
    if (!this.isValidCpf(cpf)) {
      throw new InvalidCpfException();
    }
    this._props.cpf = cpf;
  }

  setBirthDate(birthDate: BirthDateValueObject): void {
    const now = new Date();
    if (birthDate > now) {
      throw new InvalidBirthDateException();
    }
    this._props.birthDate = birthDate;
  }

  addBankAccount(bankAccount: BankAccountEntity): void {
    this._props.bankAccounts.push(bankAccount);
  }

  private isValidCpf(cpf: string): boolean {
    const digits = cpf.split('').map((el) => +el);
    const hasEmpty = digits.filter((d) => d !== digits[0]).length;
    if (hasEmpty === 0) {
      return false;
    }

    function getVerifyingDigit(arr: number[]) {
      const reduced = arr.reduce(
        (sum, digit, index) => sum + digit * (arr.length - index + 1),
        0,
      );
      return ((reduced * 10) % 11) % 10;
    }
    return (
      getVerifyingDigit(digits.slice(0, 9)) === digits[9] &&
      getVerifyingDigit(digits.slice(0, 10)) === digits[10]
    );
  }

  toJSON() {
    return {
      id: this._id,
      ...this._props,
      password: undefined,
    };
  }
}
