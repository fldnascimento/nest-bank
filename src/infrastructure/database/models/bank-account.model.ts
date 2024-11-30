import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ClientModel } from '@infrastructure/database/models/client.model';
import { TransactionModel } from '@infrastructure/database/models/transaction.model';

@Table({ tableName: 'bank_accounts', timestamps: false, underscored: true })
export class BankAccountModel extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.STRING,
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  accountNumber!: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0,
    get() {
      return parseFloat(this.getDataValue('balance'));
    },
  })
  balance!: number;

  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false, type: DataType.STRING })
  clientId!: string;

  @BelongsTo(() => ClientModel)
  client!: ClientModel;

  @HasMany(() => TransactionModel)
  transactions: TransactionModel[];
}
