import { BankAccountRepository } from 'src/domain/bank-account/repositories/bank-account.repository';
import { BankAccountMapper } from '../mappers/bank-account.mapper';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { BankAccountModel } from '../database/models/bank-account.model';
import { Injectable } from '@nestjs/common';
import { TransactionModel } from '../database/models/transaction.model';
import { randomUUID } from 'crypto';

@Injectable()
export class BankAccountImplRepository implements BankAccountRepository {
  constructor(private readonly bankAccountMapper: BankAccountMapper) {}

  async save(bankAccount: BankAccountEntity): Promise<BankAccountEntity> {
    const accountData = this.bankAccountMapper.toModel(bankAccount);
    const accountModel = await BankAccountModel.create(accountData.toJSON());
    return this.bankAccountMapper.toEntity(accountModel);
  }

  async findById(id: string): Promise<BankAccountEntity | null> {
    const account = await BankAccountModel.findByPk(id, {
      include: ['transactions'],
    });

    if (!account) {
      return null;
    }
    return this.bankAccountMapper.toEntity(account);
  }

  async update(bankAccount: BankAccountEntity): Promise<void> {
    const accountData = this.bankAccountMapper.toModel(bankAccount);

    const transactions = bankAccount.transactions.filter(
      (transaction) => !transaction.id,
    );

    // TODO: Melhorar essa parte
    for (const transaction of transactions) {
      await TransactionModel.create({
        id: randomUUID(),
        type: transaction.type,
        amount: transaction.amount,
        date: transaction.date,
        destinationAccountId: transaction.destinationAccount?.id,
        sourceAccountId: bankAccount.id,
      });
    }
    await BankAccountModel.upsert(accountData.toJSON());
  }

  async findByAccountNumber(
    accountNumber: string,
  ): Promise<BankAccountEntity | null> {
    const account = await BankAccountModel.findOne({
      where: {
        accountNumber,
      },
      include: ['transactions'],
    });

    if (!account) {
      return null;
    }
    return this.bankAccountMapper.toEntity(account);
  }
}
