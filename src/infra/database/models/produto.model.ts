import { Model } from './model';

export class ProdutoModel extends Model {
  nome!: string;
  descricao!: string;
  codigo!: number;
}
