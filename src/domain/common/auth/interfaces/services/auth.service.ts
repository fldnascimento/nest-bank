import { Service } from '@domain/common/domain/service';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { ClientTokenEntity } from '@domain/client/entities/client-token.entity';

export interface AuthService extends Service {
  login(client: ClientEntity): Promise<ClientTokenEntity>;
  validateClient(cpf: string, password: string): Promise<ClientEntity>;
}
