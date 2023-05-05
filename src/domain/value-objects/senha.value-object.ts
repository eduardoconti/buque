import * as bcrypt from 'bcrypt';

import { DomainPrimitive, ValueObject } from '@domain/core';
import { ArgumentInvalidException } from '@domain/exceptions';
export class Senha extends ValueObject<string> {
  public constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!value) {
      throw new ArgumentInvalidException('senha must be not empty');
    }
  }

  static async hash(senha: string): Promise<Senha> {
    const bcryptHash = await bcrypt.hash(senha, 10);
    return new Senha(bcryptHash);
  }

  static async compareHash(senha: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(senha, hash);
  }
}
