import { ProdutoMateriaPrima } from '@domain/produto/entities';
import { DateVO, UUID } from '@domain/value-objects';

import { MateriaPrimaModel } from './materia-prima.model';

export class ProdutoMateriaPrimaModel {
  id!: string;
  id_produto!: string;
  id_materiaPrima!: string;
  quantidade!: number;
  data_inclusao!: Date;
  data_alteracao!: Date;
  materia_prima!: MateriaPrimaModel;

  static fromEntity(
    entity: ProdutoMateriaPrima,
  ): Omit<ProdutoMateriaPrimaModel, 'materia_prima'> {
    return {
      id: entity.id.value,
      id_produto: entity.idProduto.value,
      id_materiaPrima: entity.materiaPrima.id.value,
      quantidade: entity.quantidade,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
    };
  }

  static toEntity({
    id,
    id_produto,
    quantidade,
    data_alteracao,
    data_inclusao,
    materia_prima,
  }: ProdutoMateriaPrimaModel): ProdutoMateriaPrima {
    return new ProdutoMateriaPrima({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        materiaPrima: MateriaPrimaModel.toEntity(materia_prima),
        idProduto: new UUID(id_produto),
        quantidade,
      },
    });
  }
}
