import type { IUseCase } from '@domain/core';

export interface RegistrarPedidoUseCaseInput {
  idCliente: string;
  itemPedido: { idProduto: string; quantidade: number }[];
  dataEntrega?: Date;
}

export interface RegistrarPedidoUseCaseOutput {
  id: string;
  itemPedido: { idProduto: string; quantidade: number }[];
  valor: number;
  dataEntrega?: Date;
}

export type IRegistrarPedidoUseCase = IUseCase<
  RegistrarPedidoUseCaseInput,
  RegistrarPedidoUseCaseOutput
>;
