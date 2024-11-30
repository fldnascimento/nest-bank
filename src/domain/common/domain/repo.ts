import { Entity } from '@domain/common/domain/entity';

export interface Repo<T extends Entity<any>> {
  save(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
}
