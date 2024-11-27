import { ClientEntity } from 'src/domain/client/entities/client.entity';
import { ClientModel } from '../database/models/client.model';
import { Injectable } from '@nestjs/common';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { Mapper } from 'src/domain/common/infrastructure/mapper';

@Injectable()
export class ClientMapper implements Mapper<ClientEntity, ClientModel> {
  toModel(entity: ClientEntity): ClientModel {
    const accounts = entity.accounts.map((account) => {
      return {
        id: account.id,
        accountNumber: account.accountNumber,
        clientId: account.clientId,
        balance: account.balance,
        isActive: account.isActive,
      };
    });

    const client = new ClientModel({
      id: entity.id,
      fullName: entity.fullName,
      cpf: entity.cpf,
      birthDate: entity.birthDate,
      accounts: accounts,
    });

    return client;
  }

  toEntity(clientModel: ClientModel): ClientEntity {
    const client = new ClientEntity(
      clientModel.id,
      clientModel.fullName,
      clientModel.cpf,
      clientModel.birthDate,
    );

    clientModel.accounts.forEach((account) => {
      client.addBankAccount(
        new BankAccountEntity(
          account.id,
          account.accountNumber,
          client.id,
          account.balance,
          account.isActive,
        ),
      );
    });

    return client;
  }
}
