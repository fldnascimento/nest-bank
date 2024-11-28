import { Repo } from 'src/domain/common/domain/repo';
import { ClientEntity } from '../../entities/client.entity';

export interface ClientRepository extends Repo<ClientEntity> {
  findByCpf(cpf: string): Promise<ClientEntity | null>;
}
