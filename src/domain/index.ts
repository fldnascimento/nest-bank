import { APP_GUARD } from '@nestjs/core';
import { BankAccountImplService } from '@domain/bank-account/services/bank-account-impl.service';
import { ClientImplService } from '@domain/client/services/client-impl.service';
import { authDependenciesModules, authStrategies } from '@domain/common/auth';
import { AuthImplService } from '@domain/common/auth/services/auth-impl.service';
import { JwtAuthGuard } from '@domain/common/auth/guards/jwt-auth.guard';

const bankAccountServices = [
  {
    provide: 'BankAccountService',
    useClass: BankAccountImplService,
  },
];
const clientServices = [
  {
    provide: 'ClientService',
    useClass: ClientImplService,
  },
];

const authServices = [
  {
    provide: 'AuthService',
    useClass: AuthImplService,
  },
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
];

export const modules = (jwtSecret?: string) => [
  ...authDependenciesModules(jwtSecret),
];

export default [
  ...bankAccountServices,
  ...clientServices,
  ...authServices,
  ...authStrategies,
];
