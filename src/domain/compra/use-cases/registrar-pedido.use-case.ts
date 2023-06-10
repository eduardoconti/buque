import type { IUseCase } from '@domain/core';

export interface RegistrarCompraUseCaseInput {
  idFornecedor: string;
  itemCompra: { idMateriaPrima: string; quantidade: number; valor: number }[];
}

export interface RegistrarCompraUseCaseOutput {
  id: string;
  itemCompra: {
    idMateriaPrima: string;
    quantidade: number;
    valor: number;
    valorUnitario: number;
  }[];
  valor: number;
}

export type IRegistrarCompraUseCase = IUseCase<
  RegistrarCompraUseCaseInput,
  RegistrarCompraUseCaseOutput
>;
