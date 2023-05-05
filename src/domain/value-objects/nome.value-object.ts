import type { DomainPrimitive } from '@domain/core';
import { ValueObject } from '@domain/core';
import { ArgumentInvalidException } from '@domain/exceptions';

export class Nome extends ValueObject<string> {
  public constructor(nome: string) {
    super({ value: nome });
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    const minLength = 2;
    const maxLength = 100;
    if (value.length <= minLength || value.length > maxLength) {
      throw new ArgumentInvalidException(
        'Nome must be greater than 2 and less than 100 characters.',
      );
    }
  }
}
