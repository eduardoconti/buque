import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

import type { RegistrarCompraUseCaseInput } from '@domain/compra/use-cases';

import { ItemCompraInput } from './item-compra.input.dto';

export class RegistrarCompraInput {
  @IsString()
  @ApiProperty()
  id_fornecedor!: string;

  @ValidateNested()
  @Type(() => ItemCompraInput)
  @ApiProperty({ type: ItemCompraInput, isArray: true })
  @IsArray()
  item_compra!: ItemCompraInput[];

  static mapToUseCaseInput({
    id_fornecedor,
    item_compra,
  }: RegistrarCompraInput): RegistrarCompraUseCaseInput {
    return {
      idFornecedor: id_fornecedor,
      itemCompra: item_compra.map((e) => {
        return {
          idMateriaPrima: e.id_materia_prima,
          quantidade: e.quantidade,
          valor: e.total_item,
        };
      }),
    };
  }
}
