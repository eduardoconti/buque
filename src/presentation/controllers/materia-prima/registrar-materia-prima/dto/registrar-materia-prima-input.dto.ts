import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import type { RegistrarMateriaPrimaUseCaseInput } from '@app/use-cases/materia-prima';

export class RegistrarMateriaPrimaInput {
  @IsString()
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  @IsString()
  descricao!: string;

  static mapToUseCaseInput({
    nome,
    descricao,
  }: RegistrarMateriaPrimaInput): RegistrarMateriaPrimaUseCaseInput {
    return {
      nome,
      descricao,
    };
  }
}
