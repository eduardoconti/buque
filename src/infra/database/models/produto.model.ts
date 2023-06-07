import { Produto } from '@domain/produto/entities';
import { Amount, DateVO, Nome, UUID } from '@domain/value-objects';

import { Model } from './model';
import { ProdutoMateriaPrimaModel } from './produto-materia-prima.model';

export class ProdutoModel extends Model {
  nome!: string;
  descricao!: string;
  produto_materia_prima!: ProdutoMateriaPrimaModel[];
  valor!: number;
  preco_custo!: number;

  static fromEntity(entity: Produto): Omit<
    ProdutoModel,
    'produto_materia_prima'
  > & {
    produto_materia_prima: Omit<ProdutoMateriaPrimaModel, 'materia_prima'>[];
  } {
    return {
      id: entity.id.value,
      nome: entity.props.nome.value,
      descricao: entity.props.descricao,
      produto_materia_prima: entity.props.produtoMateriaPrima.map((e) =>
        ProdutoMateriaPrimaModel.fromEntity(e),
      ),
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      valor: entity.valor.value,
      preco_custo: entity.precoCusto.value,
    };
  }

  static toEntity({
    id,
    nome,
    descricao,
    valor,
    produto_materia_prima,
    data_alteracao,
    data_inclusao,
    preco_custo,
  }: ProdutoModel): Produto {
    return new Produto({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        nome: new Nome(nome),
        descricao,
        valor: new Amount(valor),
        precoCusto: new Amount(preco_custo),
        produtoMateriaPrima: produto_materia_prima.map((e) =>
          ProdutoMateriaPrimaModel.toEntity(e),
        ),
      },
    });
  }
}
