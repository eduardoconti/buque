import { ItemPedido } from '@domain/pedido/entities';
import { DateVO, Quantidade, UUID } from '@domain/value-objects';

import { ProdutoModel } from './produto.model';

export class ItemPedidoModel {
  id!: string;
  id_pedido!: string;
  id_produto!: string;
  quantidade!: number;
  data_inclusao!: Date;
  data_alteracao!: Date;
  produto!: ProdutoModel;

  static toEntity({
    id,
    id_pedido,
    quantidade,
    data_alteracao,
    data_inclusao,
    produto,
  }: ItemPedidoModel): ItemPedido {
    return new ItemPedido({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        idPedido: new UUID(id_pedido),
        produto: ProdutoModel.toEntity(produto),
        quantidade: new Quantidade(quantidade),
      },
    });
  }

  static toModel(entity: ItemPedido): Omit<ItemPedidoModel, 'produto'> {
    return {
      id: entity.id.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      id_pedido: entity.idPedido.value,
      id_produto: entity.produto.id.value,
      quantidade: entity.quantidade.value,
    };
  }
}
