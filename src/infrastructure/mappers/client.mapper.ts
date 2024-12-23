import { Injectable } from '@nestjs/common';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { Mapper } from '@domain/common/infrastructure/mapper';
import { ClientModel } from '@infrastructure/database/models/client.model';

@Injectable()
export class ClientMapper implements Mapper<ClientEntity, ClientModel> {
  toModel(entity: ClientEntity): ClientModel {
    const accounts = entity?.accounts?.map((account) => {
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
      password: entity.password,
    });

    return client;
  }

  toEntity(clientModel: ClientModel): ClientEntity {
    const client = new ClientEntity(
      {
        fullName: clientModel.fullName,
        cpf: clientModel.cpf,
        birthDate: clientModel.birthDate,
        bankAccounts: [],
        password: clientModel.password,
      },
      clientModel.id,
    );

    clientModel?.accounts?.forEach((account) => {
      client.addBankAccount(
        new BankAccountEntity(
          {
            accountNumber: account.accountNumber,
            clientId: client.id,
            balance: account.balance,
            isActive: account.isActive,
          },
          account.id,
        ),
      );
    });

    return client;
  }
}
