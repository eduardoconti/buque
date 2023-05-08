import { ApiProperty } from '@nestjs/swagger';

import type { RegistrarMateriaPrimaUseCaseInput } from '@app/use-cases/materia-prima';

export class RegistrarMateriaPrimaInput {
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  descricao!: string;
  @ApiProperty()
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
