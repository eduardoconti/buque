import type { DomainEvent } from './domain-event';

export interface IEventEmitter {
  emitAsync(key: string, data: DomainEvent): Promise<void>;
  emit(key: string, data: DomainEvent): void;
}
