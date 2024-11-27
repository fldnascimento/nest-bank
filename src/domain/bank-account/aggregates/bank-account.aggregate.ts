import { TransactionValueObject } from '../value-objects/transaction.value-object';
import { BankAccountEntity } from '../entities/bank-account.entity';

export class BankAccountAggregate {
  private transactions: TransactionValueObject[] = [];

  constructor(private bankAccount: BankAccountEntity) {}

  addTransaction(transaction: TransactionValueObject) {
    this.transactions.push(transaction);
  }

  // Métodos para manipular a conta bancária e garantir regras de negócio
  deposit(amount: number) {
    this.bankAccount.deposit(amount);
    const transaction = new TransactionValueObject('CREDIT', amount, null);
    this.addTransaction(transaction);
  }

  withdraw(amount: number) {
    this.bankAccount.withdraw(amount);
    const transaction = new TransactionValueObject('DEBIT', amount, null);
    this.addTransaction(transaction);
  }

  transfer(destinationAccount: BankAccountEntity, amount: number) {
    this.bankAccount.transfer(destinationAccount, amount);
    const transaction = new TransactionValueObject(
      'TRANSFER',
      amount,
      destinationAccount,
    );
    this.addTransaction(transaction);
  }

  getTransactions() {
    return this.transactions;
  }
}
