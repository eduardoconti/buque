import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import type { RegistraProdutoUseCaseInput } from '@app/use-cases/produto';

import { ItemMateriaPrima } from './item-materia-prima.input.dto';

export class RegistrarProdutoInput {
  @IsString()
  @ApiProperty()
  nome!: string;

  @IsString()
  @ApiProperty()
  descricao!: string;

  @Type(() => ItemMateriaPrima)
  @ValidateNested()
  @ApiProperty({ type: ItemMateriaPrima })
  @MinLength(1)
  materia_prima!: ItemMateriaPrima[];

  @IsNumber()
  @ApiProperty()
  codigo!: number;

  @IsNumber()
  @ApiProperty()
  @Min(1)
  valor!: number;

  static mapToUseCaseInput({
    nome,
    descricao,
    materia_prima,
    codigo,
    valor,
  }: RegistrarProdutoInput): RegistraProdutoUseCaseInput {
    return {
      nome,
      descricao,
      codigo,
      valor,
      itenMateriaPrima: materia_prima.map((e) => {
        return { ...e, idMateriaPrima: e.id };
      }),
    };
  }
}
