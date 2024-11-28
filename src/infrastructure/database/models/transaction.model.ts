import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BankAccountModel } from './bank-account.model';
import {
  transactionsTypes,
  TransactionType,
} from '@domain/bank-account/entities/transaction.entity';

@Table({ tableName: 'transactions', timestamps: false, underscored: true })
export class TransactionModel extends Model {
  @Column({ primaryKey: true, type: DataType.STRING })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(transactionsTypes)),
  })
  type!: TransactionType;

  @Column({ allowNull: false, type: DataType.DECIMAL(10, 2) })
  amount!: number;

  @Column({ allowNull: false, type: DataType.DATE })
  date!: Date;

  @ForeignKey(() => BankAccountModel)
  @Column({ allowNull: true, type: DataType.STRING })
  sourceAccountId!: string | null;

  @BelongsTo(() => BankAccountModel, 'sourceAccountId')
  sourceAccount!: BankAccountModel;

  @ForeignKey(() => BankAccountModel)
  @Column({ allowNull: true, type: DataType.STRING })
  destinationAccountId!: string | null;

  @BelongsTo(() => BankAccountModel, 'destinationAccountId')
  destinationAccount!: BankAccountModel;
}
