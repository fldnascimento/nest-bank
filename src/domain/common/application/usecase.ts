export interface UseCase<T, R> {
  execute(entity: T, ...args): Promise<R>;
}
