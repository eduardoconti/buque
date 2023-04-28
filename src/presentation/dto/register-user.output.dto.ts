import { ApiProperty } from '@nestjs/swagger';

import { RegisterUserUseCaseOutput } from '@app/use-cases';

export class RegisterUserOutput {
  @ApiProperty({
    example: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  })
  id!: string;

  @ApiProperty({
    example: 'Eduardo Conti',
  })
  name!: string;

  @ApiProperty({
    example: 'es.eduardoconti@gmail.com',
  })
  email!: string;
  static fromUseCaseOutput({
    name,
    email,
    id,
  }: RegisterUserUseCaseOutput): RegisterUserOutput {
    return {
      email,
      name,
      id,
    };
  }
}
