import { Injectable } from '@nestjs/common';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { Mapper } from 'src/domain/common/infrastructure/mapper';
import { BankAccountModel } from '../database/models/bank-account.model';
import { TransactionEntity } from 'src/domain/bank-account/entities/transaction.entity';

@Injectable()
export class BankAccountMapper
  implements Mapper<BankAccountEntity, BankAccountModel>
{
  toEntity(model: BankAccountModel): BankAccountEntity {
    const transactions = model?.transactions?.map((transaction) => {
      const destinationAccount = transaction.destinationAccount;
      let destinationAccountEntity: BankAccountEntity = undefined;

      if (destinationAccount) {
        destinationAccountEntity = new BankAccountEntity(
          {
            accountNumber: destinationAccount.accountNumber,
            clientId: destinationAccount.clientId,
            balance: destinationAccount.balance,
            isActive: destinationAccount.isActive,
          },
          destinationAccount.id,
        );
      }
      return new TransactionEntity(
        {
          type: transaction.type,
          amount: +transaction.amount,
          destinationAccount: destinationAccountEntity,
          date: transaction.date,
        },
        transaction.id,
      );
    });
    const bankAccount = new BankAccountEntity(
      {
        accountNumber: model.accountNumber,
        clientId: model.clientId,
        balance: +model.balance,
        isActive: model.isActive,
      },
      model.id,
    );
    bankAccount.setTransactions(transactions || []);
    return bankAccount;
  }

  toModel(entity: BankAccountEntity): BankAccountModel {
    return BankAccountModel.build({
      id: entity.id,
      accountNumber: entity.accountNumber,
      clientId: entity.clientId,
      balance: entity.balance,
      isActive: entity.isActive,
      transactions: entity.transactions,
    });
  }
}
