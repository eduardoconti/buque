import type { Quantidade } from '@domain/value-objects';
import { Amount } from '@domain/value-objects';

import type { ItemCompra } from '../entities';

export function calculaValorItens(itensPedido: ItemCompra[]): Amount {
  const valorInicial = 0;
  return new Amount(
    itensPedido.reduce(
      (anterior, current) => (anterior += current.totalItem.value),
      valorInicial,
    ),
  );
}

export function calculaCustoUnitario(
  valor: Amount,
  quantidade: Quantidade,
): Amount {
  const valorUnitario = Math.round(valor.value / quantidade.value);
  return new Amount(valorUnitario);
}
