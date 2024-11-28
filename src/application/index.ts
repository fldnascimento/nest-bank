import { CreateBankAccountUseCase } from './bank-account/usecases/create-bank-account.usecase';
import { DepositUseCase } from './bank-account/usecases/deposit.usecase';
import { GetBankAccountUseCase } from './bank-account/usecases/get-bank-account.usecase';
import { WithdrawUseCase } from './bank-account/usecases/withdraw.usecase';
import { CreateClientUseCase } from './client/usecases/create-client.usecase';
import { GetClientUseCase } from './client/usecases/get-client.usecase';

const bankAccountUseCases = [
  CreateBankAccountUseCase,
  DepositUseCase,
  GetBankAccountUseCase,
  WithdrawUseCase,
];

const clientUseCases = [CreateClientUseCase, GetClientUseCase];

export default [...bankAccountUseCases, ...clientUseCases];
