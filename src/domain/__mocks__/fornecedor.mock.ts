import {
  Fornecedor,
  FornecedorMateriaPrima,
} from '@domain/entities/fornecedor';
import { DateVO, Email, Nome, UUID } from '@domain/value-objects';

import { mockMateriaPrimaEntity } from './materia-prima.mock';

export const mockFornecedorEntity = new Fornecedor({
  id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
  dataInclusao: new DateVO(new Date()),
  dataAlteracao: new DateVO(new Date()),
  props: {
    nome: new Nome('Eduardo Conti'),
    email: new Email('es.eduardoconti@gmail.com'),
    telefone: '(44)984079729',
    materiaPrimaTrabalhada: [
      new FornecedorMateriaPrima({
        id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
        dataInclusao: new DateVO(new Date()),
        dataAlteracao: new DateVO(new Date()),
        props: {
          idFornecedor: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
          materiaPrima: mockMateriaPrimaEntity,
        },
      }),
    ],
  },
});
