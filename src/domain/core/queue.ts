export interface IQueue<T = unknown> {
  /**
   * The nome of the queue
   */
  nome: string;

  add(data: T): Promise<void>;
}
