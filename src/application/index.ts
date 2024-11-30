import { CreateBankAccountUseCase } from '@application/bank-account/usecases/create-bank-account.usecase';
import { DepositUseCase } from '@application/bank-account/usecases/deposit.usecase';
import { GetBankAccountUseCase } from '@application/bank-account/usecases/get-bank-account.usecase';
import { TransferUseCase } from '@application/bank-account/usecases/transfer.usecase';
import { UpdateBankAccountUseCase } from '@application/bank-account/usecases/update-bank-account.usecase';
import { WithdrawUseCase } from '@application/bank-account/usecases/withdraw.usecase';
import { CreateClientUseCase } from '@application/client/usecases/create-client.usecase';
import { GetClientUseCase } from '@application/client/usecases/get-client.usecase';
import { LoginUseCase } from '@application/client/usecases/login.usecase';

const bankAccountUseCases = [
  CreateBankAccountUseCase,
  DepositUseCase,
  GetBankAccountUseCase,
  WithdrawUseCase,
  UpdateBankAccountUseCase,
  TransferUseCase,
];

const clientUseCases = [CreateClientUseCase, GetClientUseCase, LoginUseCase];

export default [...bankAccountUseCases, ...clientUseCases];
