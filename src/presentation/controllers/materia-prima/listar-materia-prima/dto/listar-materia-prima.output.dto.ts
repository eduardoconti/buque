import { ApiProperty } from '@nestjs/swagger';

export class ListarMateriaPrimaOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  descricao!: string;
  @ApiProperty()
  valor_unitario!: number;
}
