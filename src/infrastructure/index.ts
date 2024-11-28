import { BankAccountModel } from './database/models/bank-account.model';
import { ClientModel } from './database/models/client.model';
import { TransactionModel } from './database/models/transaction.model';
import { BankAccountMapper } from './mappers/bank-account.mapper';
import { ClientMapper } from './mappers/client.mapper';
import { BankAccountImplRepository } from './repositories/bank-account-impl.repository';
import { ClientImplRepository } from './repositories/client-impl.repository';

const mappers = [BankAccountMapper, ClientMapper];
const repositories = [
  {
    provide: 'BankAccountRepository',
    useClass: BankAccountImplRepository,
  },
  {
    provide: 'ClientRepository',
    useClass: ClientImplRepository,
  },
];
export default [...mappers, ...repositories];

export const models = [BankAccountModel, ClientModel, TransactionModel];
