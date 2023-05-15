import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { RegistrarFornecedorUseCaseOutput } from '@app/use-cases/fornecedor';

import { FornecedorMateriaPrimaOutput } from './fornecedor-materia-prima.output.dto';

export class RegistrarFornecedorOutput {
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

  @ApiPropertyOptional({
    example: 'www.shopee.com.br',
  })
  site?: string;

  @ApiProperty({ type: FornecedorMateriaPrimaOutput })
  materia_prima_trabalhada!: FornecedorMateriaPrimaOutput[];

  static fromUseCaseOutput({
    id,
    materiaPrimaTrabalhada,
    nome,
    telefone,
    email,
    site,
  }: RegistrarFornecedorUseCaseOutput): RegistrarFornecedorOutput {
    return {
      id,
      nome,
      telefone,
      email,
      site,
      materia_prima_trabalhada: materiaPrimaTrabalhada.map(({ id, nome }) => {
        return {
          id_materia_prima: id,
          nome,
        };
      }),
    };
  }
}
