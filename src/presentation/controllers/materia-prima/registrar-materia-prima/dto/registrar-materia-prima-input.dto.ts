import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import type { RegistrarMateriaPrimaUseCaseInput } from '@app/use-cases/materia-prima';

export class RegistrarMateriaPrimaInput {
  @IsString()
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  @IsString()
  descricao!: string;
  @ApiProperty()
  @IsNumber()
  valor_unitario!: number;

  static mapToUseCaseInput({
    nome,
    descricao,
    valor_unitario,
  }: RegistrarMateriaPrimaInput): RegistrarMateriaPrimaUseCaseInput {
    return {
      nome,
      descricao,
      valorUnitario: valor_unitario,
    };
  }
}
