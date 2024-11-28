import { Service } from '@domain/common/domain/service';
import { ClientEntity } from '@domain/client/entities/client.entity';

export interface ClientService extends Service {
  createClient(client: ClientEntity): Promise<ClientEntity>;
  getClient(id: string): Promise<ClientEntity>;
}
