import { Cliente } from '@domain/entities/cliente';
import { DateVO, Email, Nome, UUID } from '@domain/value-objects';

export const mockClienteEntity = new Cliente({
  id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
  dataInclusao: new DateVO(new Date()),
  dataAlteracao: new DateVO(new Date()),
  props: {
    nome: new Nome('Eduardo Conti'),
    email: new Email('es.eduardoconti@gmail.com'),
    telefone: '(44)984079729',
  },
});
