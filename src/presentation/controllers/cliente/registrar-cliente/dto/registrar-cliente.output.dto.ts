import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegistrarClienteOutput {
  @ApiProperty({
    example: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  })
  id!: string;

  @ApiProperty({
    example: 'Eduardo Conti',
  })
  nome!: string;

  @ApiPropertyOptional({
    example: 'es.eduardoconti@gmail.com',
  })
  email?: string;

  @ApiProperty({
    example: '(44)984089729',
  })
  telefone!: string;
}
