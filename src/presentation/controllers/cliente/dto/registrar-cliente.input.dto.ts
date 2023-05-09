import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

import type { RegistrarClienteUseCaseInput } from '@app/use-cases/cliente';

export class RegistrarClienteInput {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({
    example: 'Eduardo Conti',
  })
  nome!: string;

  @ApiProperty({
    example: 'es.eduardoconti@gmail.com',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  email!: string;

  @ApiProperty({
    example: '(44)984089729',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  telefone!: string;

  static toUseCaseInput({
    nome,
    email,
    telefone,
  }: RegistrarClienteInput): RegistrarClienteUseCaseInput {
    return {
      email,
      telefone,
      nome,
    };
  }
}
