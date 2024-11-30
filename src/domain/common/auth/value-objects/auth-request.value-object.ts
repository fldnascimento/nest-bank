import { ClientEntity } from '@domain/client/entities/client.entity';

export interface AuthRequestValueObject extends Request {
  user: ClientEntity;
}
