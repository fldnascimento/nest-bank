import { Repo } from '@domain/common/domain/repo';
import { ClientEntity } from '@domain/client/entities/client.entity';

export interface ClientRepository extends Repo<ClientEntity> {
  findByCpf(cpf: string): Promise<ClientEntity | null>;
}
