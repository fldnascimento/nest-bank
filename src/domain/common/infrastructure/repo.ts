import { Entity } from '../domain/entity';

export interface Repo<T extends Entity> {
  save(entity: T): Promise<void>;
  findById(id: string): Promise<T | null>;
}
