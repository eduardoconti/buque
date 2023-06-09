import type { StatusPedido } from '@domain/pedido/entities';
import { Pedido } from '@domain/pedido/entities';
import { Amount, DateVO, UUID } from '@domain/value-objects';

import type { ClienteModel } from './cliente.model';
import { ItemPedidoModel } from './item-pedido.model';

export class PedidoModel {
  id!: string;
  id_cliente!: string;
  valor!: number;
  data_entrega?: Date | null;
  status!: StatusPedido;
  data_inclusao!: Date;
  data_alteracao!: Date;
  data_pagamento?: Date | null;
  cliente!: ClienteModel;
  itens!: ItemPedidoModel[];

  static toEntity({
    id,
    id_cliente,
    valor,
    data_entrega,
    status,
    data_alteracao,
    data_inclusao,
    itens,
    data_pagamento,
  }: PedidoModel): Pedido {
    return new Pedido({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        idCliente: new UUID(id_cliente),
        status,
        valor: new Amount(valor),
        dataEntrega: data_entrega ? new DateVO(data_entrega) : undefined,
        itensPedido: itens.map((e) => ItemPedidoModel.toEntity(e)),
        dataPagamento: data_pagamento ? new DateVO(data_pagamento) : undefined,
      },
    });
  }

  static fromEntity(entity: Pedido): Omit<PedidoModel, 'cliente' | 'itens'> & {
    itens: Omit<ItemPedidoModel, 'produto'>[];
  } {
    return {
      id: entity.id.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      data_entrega: entity.dataEntrega?.value ?? null,
      id_cliente: entity.idCliente.value,
      status: entity.status,
      valor: entity.valor.value,
      itens: entity.itensPedido.map((e) => ItemPedidoModel.toModel(e)),
      data_pagamento: entity.dataPagamento?.value ?? null,
    };
  }
}
