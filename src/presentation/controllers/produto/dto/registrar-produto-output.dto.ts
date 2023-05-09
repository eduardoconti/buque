import { ApiProperty } from '@nestjs/swagger';

import type { ItemMateriaPrimaOutput } from './item-materia-prima.output.dto';

export class RegistrarProdutoOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  descricao!: string;
  @ApiProperty()
  materia_prima!: ItemMateriaPrimaOutput[];
}
