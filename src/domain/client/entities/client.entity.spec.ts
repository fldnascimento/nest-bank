import { ClientEntity } from './client.entity';
import { InvalidCpfException } from '@domain/client/exceptions/invalid-cpf.exception';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { InvalidFullNameException } from '@domain/client/exceptions/invalid-full-name.exception';
import { InvalidBirthDateException } from '@domain/client/exceptions/invalid-birth-date.exception';

describe('ClientEntity', () => {
  it('should create a new client with valid properties', () => {
    const client = ClientEntity.new({
      fullName: 'Felipe Nascimento',
      cpf: '123.456.789-09',
      birthDate: new Date('2000-01-01'),
    });

    expect(client.id).toBeDefined();
    expect(client.fullName).toBe('Felipe Nascimento');
    expect(client.cpf).toBe('12345678909');
    expect(client.birthDate).toEqual(new Date('2000-01-01'));
    expect(client.accounts).toEqual([]);
  });

  it('should throw an error for invalid full name', () => {
    expect(() => {
      ClientEntity.new({
        fullName: 'Jo',
        cpf: '123.456.789-09',
        birthDate: new Date('2000-01-01'),
      });
    }).toThrow(InvalidFullNameException);
  });

  it('should throw an InvalidCpfException for an invalid CPF', () => {
    expect(() => {
      ClientEntity.new({
        fullName: 'Felipe Nascimento',
        cpf: '111.111.111-11',
        birthDate: new Date('2000-01-01'),
      });
    }).toThrow(InvalidCpfException);
  });

  it('should throw an error if birth date is in the future', () => {
    expect(() => {
      ClientEntity.new({
        fullName: 'Felipe Nascimento',
        cpf: '123.456.789-09',
        birthDate: new Date('3000-01-01'),
      });
    }).toThrow(InvalidBirthDateException);
  });

  it('should add a bank account to the client', () => {
    const client = ClientEntity.new({
      fullName: 'Felipe Nascimento',
      cpf: '123.456.789-09',
      birthDate: new Date('2000-01-01'),
    });

    const account = BankAccountEntity.new({
      balance: 100,
      clientId: client.id,
      isActive: true,
    });

    client.addBankAccount(account);
    expect(client.accounts.length).toBe(1);
    expect(client.accounts[0].id).toBe(account.id);
  });

  it('should trim and update the full name', () => {
    const client = ClientEntity.new({
      fullName: 'Felipe Nascimento',
      cpf: '123.456.789-09',
      birthDate: new Date('2000-01-01'),
    });

    client.setFullName('  Felipe Lima  ');
    expect(client.fullName).toBe('Felipe Lima');
  });
});
