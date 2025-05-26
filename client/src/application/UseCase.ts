export interface UseCase<T> {
  execute(command: T): Promise<void>;
}
