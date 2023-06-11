import { ApiProperty } from '@nestjs/swagger';

import { ListarEstoqueMateriaPrimaOutput } from './listar-estroque-materia-prima.output.dto';

export class ListarMateriaPrimaOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  descricao!: string;
  @ApiProperty()
  quantidade_total!: number;
  @ApiProperty({ isArray: true, type: ListarEstoqueMateriaPrimaOutput })
  estoque_materia_prima!: ListarEstoqueMateriaPrimaOutput[];
}
