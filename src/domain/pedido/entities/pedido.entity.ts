import { Entity } from '@domain/core';
import { DateVO } from '@domain/value-objects';
import { Amount } from '@domain/value-objects';
import { UUID } from '@domain/value-objects';

import type { PropriedadesPrimitivasItemPedido } from './item-pedido.entity';
import { ItemPedido } from './item-pedido.entity';

export type StatusPedido =
  | 'AGUARDANDO_PRODUCAO'
  | 'PRODUZINDO'
  | 'CONCLUIDO'
  | 'ENTREGUE'
  | 'CANCELADO';

export interface PropriedadesPedido {
  idCliente: UUID;
  itensPedido: ItemPedido[];
  valor: Amount;
  status: StatusPedido;
  dataEntrega?: DateVO;
}

export interface PropriedadesPrimitivasPedido {
  id: string;
  idCliente: string;
  itensPedido: PropriedadesPrimitivasItemPedido[];
  dataInclusao: Date;
  dataAlteracao: Date;
  valor: number;
  dataEntrega?: Date;
}

export class Pedido extends Entity<PropriedadesPedido> {
  protected readonly _id!: UUID;

  get idCliente(): UUID {
    return this.props.idCliente;
  }

  get valor(): Amount {
    return this.props.valor;
  }

  get dataEntrega(): DateVO | undefined {
    return this.props.dataEntrega;
  }

  static create({
    idCliente,
    itensPedido,
    dataEntrega,
  }: Omit<
    PropriedadesPrimitivasPedido,
    'id' | 'dataAlteracao' | 'dataInclusao' | 'valor' | 'itensPedido'
  > & {
    itensPedido: Pick<
      PropriedadesPrimitivasItemPedido,
      'produto' | 'quantidade'
    >[];
  }): Pedido {
    const valorInicial = 0;
    const idPedido = UUID.generate();
    const itens = itensPedido.map((item) =>
      ItemPedido.create({ ...item, idPedido: idPedido.value }),
    );
    const produto = new Pedido({
      id: idPedido,
      props: {
        valor: new Amount(
          itens.reduce(
            (anterior, current) =>
              (anterior += current.valor.value * current.quantidade.value),
            valorInicial,
          ),
        ),
        status: 'AGUARDANDO_PRODUCAO',
        dataEntrega: dataEntrega ? new DateVO(dataEntrega) : undefined,
        idCliente: new UUID(idCliente),
        itensPedido: itens,
      },
    });
    return produto;
  }

  marcarComoConcluido(): void {
    this.props.status = 'CONCLUIDO';
  }
}
