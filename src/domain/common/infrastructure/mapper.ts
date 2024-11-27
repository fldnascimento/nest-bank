import { Entity } from '../domain/entity';

export interface Mapper<T extends Entity, M> {
  toEntity(raw: any): T;
  toModel(entity: T): M;
}
