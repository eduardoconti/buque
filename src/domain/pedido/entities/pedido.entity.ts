import { Entity } from '@domain/core';
import { DateVO } from '@domain/value-objects';
import type { Amount } from '@domain/value-objects';
import { UUID } from '@domain/value-objects';

import { calculaValorItens } from '../services';
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
  dataPagamento?: DateVO;
}

export interface PropriedadesPrimitivasPedido {
  id: string;
  idCliente: string;
  itensPedido: PropriedadesPrimitivasItemPedido[];
  dataInclusao: Date;
  dataAlteracao: Date;
  status: string;
  valor: number;
  dataEntrega?: Date;
  dataPagamento?: Date;
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

  get dataPagamento(): DateVO | undefined {
    return this.props.dataPagamento;
  }

  get status(): StatusPedido {
    return this.props.status;
  }

  get itensPedido(): ItemPedido[] {
    return this.props.itensPedido;
  }

  static create({
    idCliente,
    itensPedido,
    dataEntrega,
    dataPagamento,
  }: Pick<
    PropriedadesPrimitivasPedido,
    'idCliente' | 'dataEntrega' | 'dataPagamento'
  > & {
    itensPedido: Pick<
      PropriedadesPrimitivasItemPedido,
      'produto' | 'quantidade'
    >[];
  }): Pedido {
    const idPedido = UUID.generate();
    const itens = itensPedido.map((item) =>
      ItemPedido.create({ ...item, idPedido: idPedido.value }),
    );
    const produto = new Pedido({
      id: idPedido,
      props: {
        valor: calculaValorItens(itens),
        status: 'AGUARDANDO_PRODUCAO',
        dataEntrega: dataEntrega ? new DateVO(dataEntrega) : undefined,
        idCliente: new UUID(idCliente),
        itensPedido: itens,
        dataPagamento: dataPagamento ? new DateVO(dataPagamento) : undefined,
      },
    });
    return produto;
  }

  marcarComoConcluido(): void {
    this.props.status = 'CONCLUIDO';
  }

  realizarPagamento(dataPagamento?: DateVO): void {
    this.props.dataPagamento = dataPagamento ?? DateVO.now();
  }
}
