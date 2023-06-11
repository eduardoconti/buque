import { ArgumentInvalidException } from '@domain/exceptions';

import type { DomainPrimitive } from '../core';
import { ValueObject } from '../core';

export class Quantidade extends ValueObject<number> {
  public constructor(value: number) {
    super({ value });
  }

  public get value(): number {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<number>): void {
    const regexExp = /^[0-9]\d*$/gi;
    if (!regexExp.test(value.toString())) {
      throw new ArgumentInvalidException('Quantidade incorreta.');
    }
  }
}
