import { ApiProperty } from '@nestjs/swagger';

export class ListarClientesOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  email!: string;
  @ApiProperty()
  telefone!: string;
}
