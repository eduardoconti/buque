import { ApiProperty } from '@nestjs/swagger';

export class RegistrarProdutoOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  descricao!: string;
}
