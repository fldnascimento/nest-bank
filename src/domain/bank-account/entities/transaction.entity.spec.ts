import {
  TransactionEntity,
  transactionsTypes,
} from '@domain/bank-account/entities/transaction.entity';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';

describe('TransactionEntity', () => {
  it('should create a new transaction with required properties', () => {
    const transaction = TransactionEntity.new({
      type: 'CREDIT',
      amount: 100,
    });

    expect(transaction.id).toBeUndefined();
    expect(transaction.type).toBe('CREDIT');
    expect(transaction.amount).toBe(100);
    expect(transaction.date).toBeInstanceOf(Date);
    expect(transaction.destinationAccount).toBeUndefined();
  });

  it('should create a new transaction with a destination account', () => {
    const destinationAccount = BankAccountEntity.new({
      balance: 50,
      clientId: 'client-id',
      isActive: true,
    });

    const transaction = TransactionEntity.new({
      type: 'TRANSFER',
      amount: 200,
      destinationAccount,
    });

    expect(transaction.type).toBe('TRANSFER');
    expect(transaction.amount).toBe(200);
    expect(transaction.destinationAccount).toEqual(destinationAccount);
  });

  it('should serialize transaction to JSON', () => {
    const destinationAccount = BankAccountEntity.new({
      balance: 50,
      clientId: 'client-id',
      isActive: true,
    });

    const transaction = TransactionEntity.new({
      type: 'TRANSFER',
      amount: 200,
      destinationAccount,
    });

    const json = transaction.toJSON();

    expect(json.id).toBe(transaction.id);
    expect(json.type).toBe('TRANSFER');
    expect(json.amount).toBe(200);
    expect(json.date).toBeInstanceOf(Date);
    expect(json.destinationAccount).toBe(destinationAccount.accountNumber);
  });

  it('should not include destinationAccount in JSON if not provided', () => {
    const transaction = TransactionEntity.new({
      type: 'CREDIT',
      amount: 150,
    });

    const json = transaction.toJSON();

    expect(json.id).toBe(transaction.id);
    expect(json.type).toBe('CREDIT');
    expect(json.amount).toBe(150);
    expect(json.destinationAccount).toBeUndefined();
  });

  it('should allow all valid transaction types', () => {
    transactionsTypes.forEach((type) => {
      const transaction = TransactionEntity.new({
        type,
        amount: 50,
      });

      expect(transaction.type).toBe(type);
    });
  });
});
