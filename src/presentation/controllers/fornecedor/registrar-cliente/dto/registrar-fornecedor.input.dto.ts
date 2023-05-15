import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import type { RegistrarFornecedorUseCaseInput } from '@app/use-cases/fornecedor';

import { FornecedorMateriaPrimaInput } from './fornecedor-materia-prima.input.dto';

export class RegistrarFornecedorInput {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({
    example: 'Eduardo Conti',
  })
  nome!: string;

  @ApiPropertyOptional({
    example: 'es.eduardoconti@gmail.com',
  })
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  email?: string;

  @ApiProperty({
    example: '(44)984089729',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  telefone!: string;

  @ApiProperty({ type: FornecedorMateriaPrimaInput, isArray: true })
  @ValidateNested()
  @Type(() => FornecedorMateriaPrimaInput)
  materia_prima_trabalhada!: FornecedorMateriaPrimaInput[];

  @ApiPropertyOptional({
    example: 'www.shopee.com.br',
  })
  @IsUrl()
  @IsOptional()
  site?: string;

  static toUseCaseInput({
    nome,
    email,
    telefone,
    materia_prima_trabalhada,
    site,
  }: RegistrarFornecedorInput): RegistrarFornecedorUseCaseInput {
    return {
      email,
      telefone,
      nome,
      site,
      materiaPrimaTrabalhada: materia_prima_trabalhada.map((e) => {
        return { id: e.id_materia_prima };
      }),
    };
  }
}
