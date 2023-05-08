import { ApiProperty } from '@nestjs/swagger';

import type { RegistrarMateriaPrimaUseCaseInput } from '@app/use-cases/materia-prima';

export class RegistrarMateriaPrimaInput {
  @ApiProperty()
  nome!: string;
  @ApiProperty()
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
