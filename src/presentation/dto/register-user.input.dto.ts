import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { RegisterUserUseCaseInput } from '@app/use-cases';

export class RegisterUserInput {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({
    example: 'Eduardo Conti',
  })
  nome!: string;

  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({
    example: 'teste@123',
  })
  @IsString()
  senha!: string;

  @ApiProperty({
    example: 'es.eduardoconti@gmail.com',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  email!: string;

  static toUseCaseInput({
    nome,
    email,
    senha,
  }: RegisterUserInput): RegisterUserUseCaseInput {
    return {
      email,
      senha,
      nome,
    };
  }
}
