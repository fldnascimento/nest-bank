import { Entity } from '../domain/entity';

export interface Mapper<T extends Entity<any>, M> {
  toEntity(model: M): T;
  toModel(entity: T): M;
}
