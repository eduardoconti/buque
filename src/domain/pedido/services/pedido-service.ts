import { Amount } from '@domain/value-objects';

import type { ItemPedido } from '../entities';

export function calculaValorItens(itensPedido: ItemPedido[]): Amount {
  const valorInicial = 0;
  return new Amount(
    itensPedido.reduce(
      (anterior, current) => (anterior += current.valor.value),
      valorInicial,
    ),
  );
}
