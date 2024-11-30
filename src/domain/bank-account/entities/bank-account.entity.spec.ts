import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { TransactionEntity } from '@domain/bank-account/entities/transaction.entity';

describe('BankAccountEntity', () => {
  it('should create a new bank account with default properties', () => {
    const bankAccount = BankAccountEntity.new({
      balance: 100,
      clientId: 'client-id',
      isActive: true,
    });

    expect(bankAccount.id).toBeDefined();
    expect(bankAccount.accountNumber).toBeDefined();
    expect(bankAccount.balance).toBe(100);
    expect(bankAccount.isActive).toBe(true);
    expect(bankAccount.clientId).toBe('client-id');
    expect(bankAccount.transactions).toEqual([]);
  });

  it('should create a bank account with an initial balance of 0 if none is provided', () => {
    const bankAccount = BankAccountEntity.new({
      clientId: 'client-id',
      balance: undefined,
      isActive: true,
    });

    expect(bankAccount.balance).toBe(0);
  });

  it('should deposit an amount and create a CREDIT transaction', () => {
    const bankAccount = BankAccountEntity.new({
      balance: 0,
      clientId: 'client-id',
      isActive: true,
    });

    bankAccount.deposit(50);

    expect(bankAccount.balance).toBe(50);
    expect(bankAccount.transactions).toHaveLength(1);
    expect(bankAccount.transactions[0].type).toBe('CREDIT');
    expect(bankAccount.transactions[0].amount).toBe(50);
  });

  it('should withdraw an amount and create a DEBIT transaction', () => {
    const bankAccount = BankAccountEntity.new({
      balance: 100,
      clientId: 'client-id',
      isActive: true,
    });

    bankAccount.withdraw(30);

    expect(bankAccount.balance).toBe(70);
    expect(bankAccount.transactions).toHaveLength(1);
    expect(bankAccount.transactions[0].type).toBe('DEBIT');
    expect(bankAccount.transactions[0].amount).toBe(30);
  });

  it('should not withdraw if balance is insufficient', () => {
    const bankAccount = BankAccountEntity.new({
      balance: 50,
      clientId: 'client-id',
      isActive: true,
    });

    bankAccount.withdraw(60);

    expect(bankAccount.balance).toBe(50);
    expect(bankAccount.transactions).toHaveLength(0);
  });

  it('should transfer an amount and create a TRANSFER transaction', () => {
    const sourceAccount = BankAccountEntity.new({
      balance: 100,
      clientId: 'source-client-id',
      isActive: true,
    });

    const destinationAccount = BankAccountEntity.new({
      balance: 50,
      clientId: 'destination-client-id',
      isActive: true,
    });

    sourceAccount.transfer(destinationAccount, 40);

    expect(sourceAccount.balance).toBe(60);
    expect(destinationAccount.balance).toBe(90);
    expect(sourceAccount.transactions).toHaveLength(1);
    expect(sourceAccount.transactions[0].type).toBe('TRANSFER');
    expect(sourceAccount.transactions[0].amount).toBe(40);
  });

  it('should not transfer if balance is insufficient', () => {
    const sourceAccount = BankAccountEntity.new({
      balance: 30,
      clientId: 'source-client-id',
      isActive: true,
    });

    const destinationAccount = BankAccountEntity.new({
      balance: 50,
      clientId: 'destination-client-id',
      isActive: true,
    });

    sourceAccount.transfer(destinationAccount, 40);

    expect(sourceAccount.balance).toBe(30);
    expect(destinationAccount.balance).toBe(50);
    expect(sourceAccount.transactions).toHaveLength(0);
  });

  it('should set transactions manually', () => {
    const bankAccount = BankAccountEntity.new({
      balance: 100,
      clientId: 'client-id',
      isActive: true,
    });

    const transactions = [
      TransactionEntity.new({ type: 'CREDIT', amount: 100 }),
      TransactionEntity.new({ type: 'DEBIT', amount: 50 }),
    ];

    bankAccount.setTransactions(transactions);

    expect(bankAccount.transactions).toHaveLength(2);
    expect(bankAccount.transactions[0].type).toBe('CREDIT');
    expect(bankAccount.transactions[1].type).toBe('DEBIT');
  });

  it('should deactivate the account', () => {
    const bankAccount = BankAccountEntity.new({
      balance: 100,
      clientId: 'client-id',
      isActive: true,
    });

    bankAccount.setActive(false);

    expect(bankAccount.isActive).toBe(false);
  });

  it('should not allow deposits if the account is inactive', () => {
    const bankAccount = BankAccountEntity.new({
      balance: 100,
      clientId: 'client-id',
      isActive: undefined,
    });

    bankAccount.setActive(false);
    bankAccount.deposit(50);

    expect(bankAccount.balance).toBe(100);
    expect(bankAccount.transactions).toHaveLength(0);
  });

  it('should return the JSON of bank account', () => {
    const bankAccount = BankAccountEntity.new({
      balance: 100,
      clientId: 'client-id',
      isActive: true,
    });

    const json = bankAccount.toJSON();
    expect(json.balance).toBe(bankAccount.balance);
    expect(json.clientId).toBe(bankAccount.clientId);
    expect(json.isActive).toBe(bankAccount.isActive);
  });
});
