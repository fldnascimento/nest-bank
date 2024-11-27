import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { BankAccountModel } from './bank-account.model';

@Table({ tableName: 'clients', timestamps: false, underscored: true })
export class ClientModel extends Model {
  @Column({ primaryKey: true, type: DataType.STRING })
  id!: string;

  @Column({ allowNull: false, type: DataType.STRING })
  fullName!: string;

  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  cpf!: string;

  @Column({ allowNull: false, type: DataType.DATE })
  birthDate!: Date;

  @HasMany(() => BankAccountModel)
  accounts!: BankAccountModel[];
}
