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
  name!: string;

  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({
    example: 'teste@123',
  })
  @IsString()
  password!: string;

  @ApiProperty({
    example: 'es.eduardoconti@gmail.com',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  email!: string;

  static toUseCaseInput({
    name,
    email,
    password,
  }: RegisterUserInput): RegisterUserUseCaseInput {
    return {
      email,
      password,
      name,
    };
  }
}
