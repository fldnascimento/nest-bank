import { Injectable } from '@nestjs/common';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { Mapper } from 'src/domain/common/infrastructure/mapper';
import { BankAccountModel } from '../database/models/bank-account.model';

@Injectable()
export class BankAccountMapper
  implements Mapper<BankAccountEntity, BankAccountModel>
{
  toEntity(raw: any): BankAccountEntity {
    return new BankAccountEntity(
      raw.id,
      raw.accountNumber,
      raw.clientId,
      raw.balance,
      raw.isActive,
    );
  }
  toModel(entity: BankAccountEntity): BankAccountModel {
    return new BankAccountModel({
      id: entity.id,
      accountNumber: entity.accountNumber,
      clientId: entity.clientId,
      balance: entity.balance,
      isActive: entity.isActive,
    });
  }
}
