import { ItemCompra } from '@domain/compra/entities';
import { Amount, DateVO, Quantidade, UUID } from '@domain/value-objects';

export class ItemCompraModel {
  id!: string;
  id_compra!: string;
  id_materia_prima!: string;
  total_item!: number;
  quantidade!: number;
  valor_unitario!: number;
  data_inclusao!: Date;
  data_alteracao!: Date;

  static toEntity({
    id,
    id_compra,
    quantidade,
    data_alteracao,
    data_inclusao,
    id_materia_prima,
    total_item,
    valor_unitario,
  }: ItemCompraModel): ItemCompra {
    return new ItemCompra({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        idCompra: new UUID(id_compra),
        idMateriaPrima: new UUID(id_materia_prima),
        quantidade: new Quantidade(quantidade),
        totalItem: new Amount(total_item),
        valorUnitario: new Amount(valor_unitario),
      },
    });
  }

  static toModel(entity: ItemCompra): Omit<ItemCompraModel, 'materia_prima'> {
    return {
      id: entity.id.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      id_compra: entity.idCompra.value,
      id_materia_prima: entity.idMateriaPrima.value,
      quantidade: entity.quantidade.value,
      total_item: entity.totalItem.value,
      valor_unitario: entity.valorUnitario.value,
    };
  }
}
