export interface UseCase<T, R> {
  execute(entity: T): Promise<R>;
}
