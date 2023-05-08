import { Produto } from '@domain/produto/entities';
import { DateVO, Nome, UUID } from '@domain/value-objects';

import { Model } from './model';
import { ProdutoMateriaPrimaModel } from './produto-materia-prima.model';

export class ProdutoModel extends Model {
  nome!: string;
  descricao!: string;
  codigo!: number;
  produto_materia_prima!: ProdutoMateriaPrimaModel[];

  static fromEntity(entity: Produto): ProdutoModel {
    return {
      id: entity.id.value,
      nome: entity.props.nome.value,
      descricao: entity.props.descricao,
      codigo: entity.props.codigo,
      produto_materia_prima: entity.props.produtoMateriaPrima.map((e) =>
        ProdutoMateriaPrimaModel.fromEntity(e),
      ),
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
    };
  }

  static toEntity({
    id,
    nome,
    descricao,
    codigo,
    produto_materia_prima,
    data_alteracao,
    data_inclusao,
  }: ProdutoModel): Produto {
    return new Produto({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        nome: new Nome(nome),
        descricao,
        codigo,
        produtoMateriaPrima: produto_materia_prima.map((e) =>
          ProdutoMateriaPrimaModel.toEntity(e),
        ),
      },
    });
  }
}
