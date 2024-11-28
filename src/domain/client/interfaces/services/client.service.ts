import { Service } from 'src/domain/common/domain/service';
import { ClientEntity } from '../../entities/client.entity';

export interface ClientService extends Service {
  createClient(client: ClientEntity): Promise<ClientEntity>;
  getClient(id: string): Promise<ClientEntity>;
}
