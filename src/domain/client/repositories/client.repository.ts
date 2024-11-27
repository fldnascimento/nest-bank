import { Repo } from 'src/domain/common/infrastructure/repo';
import { ClientEntity } from '../entities/client.entity';

export interface ClientRepository extends Repo<ClientEntity> {
  save(client: ClientEntity): Promise<void>;
  findById(id: string): Promise<ClientEntity | null>;
}
