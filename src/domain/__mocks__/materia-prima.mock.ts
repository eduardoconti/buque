import { MateriaPrima } from '@domain/materia-prima/entities';
import { DateVO, Nome, UUID } from '@domain/value-objects';

export const mockMateriaPrimaEntity = new MateriaPrima({
  id: new UUID('19badd61-6990-45e3-acf3-faee6eb4e6aa'),
  dataAlteracao: new DateVO('2023-01-01'),
  dataInclusao: new DateVO('2023-01-01'),
  props: {
    nome: new Nome('fake nome'),
    descricao: 'fake descricao',
  },
});
