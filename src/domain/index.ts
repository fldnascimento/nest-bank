import { BankAccountImplService } from './bank-account/services/bank-account-impl.service';
import { ClientImplService } from './client/services/client-impl.service';

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

export default [...bankAccountServices, ...clientServices];
