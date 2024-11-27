import { BankAccountRepository } from 'src/domain/bank-account/repositories/bank-account.repository';
import { BankAccountMapper } from '../mappers/bank-account.mapper';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { BankAccountModel } from '../database/models/bank-account.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BankAccountImplRepository implements BankAccountRepository {
  constructor(private readonly bankAccountMapper: BankAccountMapper) {}

  async save(bankAccount: BankAccountEntity): Promise<void> {
    const accountData = this.bankAccountMapper.toModel(bankAccount);

    await BankAccountModel.create({ ...accountData });
  }
  async findById(id: string): Promise<BankAccountEntity | null> {
    const account = await BankAccountModel.findByPk(id);

    if (!account) {
      return null;
    }
    return this.bankAccountMapper.toEntity(account);
  }
  async update(bankAccount: BankAccountEntity): Promise<void> {
    const accountData = this.bankAccountMapper.toModel(bankAccount);

    await BankAccountModel.update(
      { ...accountData },
      { where: { id: bankAccount.id } },
    );
  }
}
