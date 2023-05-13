/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Produto, ProdutoMateriaPrima } from '@domain/produto/entities';
import { Amount, DateVO, Nome, UUID } from '@domain/value-objects';

import { mockMateriaPrimaEntity } from './materia-prima.mock';

export const mockProdutoMateriaPrimaEntity = new ProdutoMateriaPrima({
  id: new UUID('19badd61-6990-45e3-acf3-faee6eb4e6aa'),
  dataAlteracao: new DateVO('2023-01-01'),
  dataInclusao: new DateVO('2023-01-01'),
  props: {
    materiaPrima: mockMateriaPrimaEntity,
    quantidade: 1,
    idProduto: new UUID('19badd61-6990-45e3-acf3-faee6eb4e6aa'),
  },
});

export const mockProdutoEntity = new Produto({
  id: new UUID('19badd61-6990-45e3-acf3-faee6eb4e6aa'),
  dataAlteracao: new DateVO('2023-01-01'),
  dataInclusao: new DateVO('2023-01-01'),
  props: {
    nome: new Nome('fake nome'),
    descricao: 'fake descricao',
    produtoMateriaPrima: [mockProdutoMateriaPrimaEntity],
    valor: new Amount(1000),
    precoCusto: new Amount(1000),
  },
});
