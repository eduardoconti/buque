import { ProdutoMateriaPrima } from '@domain/produto/entities';
import { DateVO, UUID } from '@domain/value-objects';

export class ProdutoMateriaPrimaModel {
  id!: string;
  id_produto!: string;
  id_materiaPrima!: string;
  quantidade!: number;
  data_inclusao!: Date;
  data_alteracao!: Date;

  static fromEntity(entity: ProdutoMateriaPrima): ProdutoMateriaPrimaModel {
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
    id_materiaPrima,
    quantidade,
    data_alteracao,
    data_inclusao,
  }: ProdutoMateriaPrimaModel): ProdutoMateriaPrima {
    return new ProdutoMateriaPrima({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        materiaPrima: new UUID(id_materiaPrima) as any,
        idProduto: new UUID(id_produto),
        quantidade,
      },
    });
  }
}
