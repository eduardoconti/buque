import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

import type { RegistraProdutoUseCaseInput } from '@app/use-cases/produto';

import { ItemMateriaPrima } from './item-materia-prima.input.dto';

export class RegistrarProdutoInput {
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  descricao!: string;
  @ValidateNested()
  @ApiProperty({ type: ItemMateriaPrima })
  materia_prima!: ItemMateriaPrima[];
  @ApiProperty()
  codigo!: number;

  static mapToUseCaseInput({
    nome,
    descricao,
    materia_prima,
    codigo,
  }: RegistrarProdutoInput): RegistraProdutoUseCaseInput {
    return {
      nome,
      descricao,
      codigo,
      itenMateriaPrima: materia_prima.map((e) => {
        return { ...e, idMateriaPrima: e.id };
      }),
    };
  }
}
