import { MateriaPrima } from '@domain/materia-prima/entities';
import { Amount, DateVO, Nome, UUID } from '@domain/value-objects';
const fakeValorUnitario = 1000;
export const mockMateriaPrimaEntity = new MateriaPrima({
  id: new UUID('19badd61-6990-45e3-acf3-faee6eb4e6aa'),
  dataAlteracao: new DateVO('2023-01-01'),
  dataInclusao: new DateVO('2023-01-01'),
  props: {
    nome: new Nome('fake nome'),
    descricao: 'fake descricao',
    valorUnitario: new Amount(fakeValorUnitario),
  },
});
