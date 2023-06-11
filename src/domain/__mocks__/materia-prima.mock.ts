/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  EstoqueMateriaPrima,
  MateriaPrima,
} from '@domain/materia-prima/entities';
import { Amount, DateVO, Nome, Quantidade, UUID } from '@domain/value-objects';
const fakeValorUnitario = 1000;
export const mockEstoqueMateriaPrimaEntity = new EstoqueMateriaPrima({
  id: new UUID('19badd61-6990-45e3-acf3-faee6eb4e6aa'),
  dataAlteracao: new DateVO('2023-01-01'),
  dataInclusao: new DateVO('2023-01-01'),
  props: {
    idMateriaPrima: new UUID('19badd61-6990-45e3-acf3-faee6eb4e6aa'),
    encerrado: false,
    quantidade: new Quantidade(1),
    custoUnitario: new Amount(fakeValorUnitario),
  },
});
export const mockMateriaPrimaEntity = new MateriaPrima({
  id: new UUID('19badd61-6990-45e3-acf3-faee6eb4e6aa'),
  dataAlteracao: new DateVO('2023-01-01'),
  dataInclusao: new DateVO('2023-01-01'),
  props: {
    nome: new Nome('fake nome'),
    descricao: 'fake descricao',
    estoqueMateriaPrima: [mockEstoqueMateriaPrimaEntity],
  },
});
