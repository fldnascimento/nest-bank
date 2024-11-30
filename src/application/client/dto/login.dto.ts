import { ClientEntity } from '@domain/client/entities/client.entity';

export interface LoginDto extends Request {
  user: ClientEntity;
}
