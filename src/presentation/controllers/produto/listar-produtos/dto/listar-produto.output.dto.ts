import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ItemMateriaPrimaOutput } from './item-materia-prima.output.dto';

export class ListarProdutoOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  descricao!: string;
  @Type(() => ItemMateriaPrimaOutput)
  @ApiProperty({ type: ItemMateriaPrimaOutput, isArray: true })
  materia_prima!: ItemMateriaPrimaOutput[];
  @ApiProperty()
  preco_custo!: string;
}
