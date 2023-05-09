import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min, ValidateNested } from 'class-validator';

import type { RegistraProdutoUseCaseInput } from '@app/use-cases/produto';

import { ItemMateriaPrima } from './item-materia-prima.input.dto';

export class RegistrarProdutoInput {
  @IsString()
  @ApiProperty()
  nome!: string;

  @IsString()
  @ApiProperty()
  descricao!: string;

  @ValidateNested()
  @Type(() => ItemMateriaPrima)
  @ApiProperty({ type: ItemMateriaPrima })
  materia_prima!: ItemMateriaPrima[];

  @IsNumber()
  @ApiProperty()
  @Min(1)
  valor!: number;

  static mapToUseCaseInput({
    nome,
    descricao,
    materia_prima,
    valor,
  }: RegistrarProdutoInput): RegistraProdutoUseCaseInput {
    return {
      nome,
      descricao,
      valor,
      itemMateriaPrima: materia_prima.map((e) => {
        return { ...e, idMateriaPrima: e.id };
      }),
    };
  }
}
