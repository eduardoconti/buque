import type {
  RegisterUserUseCaseInput,
  RegisterUserUseCaseOutput,
  UserAuthUseCaseInput,
} from '@app/use-cases';
import type {
  RegistrarClienteUseCaseInput,
  RegistrarClienteUseCaseOutput,
} from '@app/use-cases/cliente';
import type {
  RegistrarFornecedorUseCaseInput,
  RegistrarFornecedorUseCaseOutput,
} from '@app/use-cases/fornecedor';
import type { RegistrarMateriaPrimaUseCaseInput } from '@app/use-cases/materia-prima';
import type { RegistraProdutoUseCaseInput } from '@app/use-cases/produto';

import type {
  RegistrarCompraUseCaseInput,
  RegistrarCompraUseCaseOutput,
} from '@domain/compra/use-cases';
import type {
  RegistrarPedidoUseCaseInput,
  RegistrarPedidoUseCaseOutput,
} from '@domain/pedido/use-cases';

export const mockRegisterUserUseCaseInput: RegisterUserUseCaseInput = {
  nome: 'Eduardo Conti',
  email: 'eduardo.conti@gmail.com',
  senha: 'teste@123',
};

export const mockRegisterUserUseCaseOutput: RegisterUserUseCaseOutput = {
  id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  nome: 'Eduardo Conti',
  email: 'eduardo.conti@gmail.com',
};

export const mockUserAuthUseCaseInput: UserAuthUseCaseInput = {
  userName: 'eduardo.conti@gmail.com',
  senha: 'teste@123',
};

export const mockRegistraProdutoUseCaseInput: RegistraProdutoUseCaseInput = {
  descricao: 'fake descricao',
  valor: 1000,
  nome: 'fake nome',
  itemMateriaPrima: [
    {
      idMateriaPrima: '29badd61-6990-45e3-acf3-faee6eb4e6ab',
      quantidade: 1,
    },
  ],
};

export const mockRegistrarMateriaPrimaUseCase: RegistrarMateriaPrimaUseCaseInput =
  {
    nome: 'fake nome',
    descricao: 'fake descricao',
    valorUnitario: 1000,
  };

export const mockRegistrarClienteUseCaseInput: RegistrarClienteUseCaseInput = {
  nome: 'Eduardo Conti',
  email: 'eduardo.conti@gmail.com',
  telefone: '(44)984089729',
};

export const mockRegistrarClienteUseCaseOutput: RegistrarClienteUseCaseOutput =
  {
    id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
    nome: 'Eduardo Conti',
    email: 'eduardo.conti@gmail.com',
    telefone: '(44)984089729',
  };

export const mockRegistrarFornecedorUseCaseInput: RegistrarFornecedorUseCaseInput =
  {
    nome: 'Eduardo Conti',
    email: 'eduardo.conti@gmail.com',
    telefone: '(44)984089729',
    materiaPrimaTrabalhada: [
      {
        id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
      },
    ],
  };

export const mockRegistrarFornecedorUseCaseOutput: RegistrarFornecedorUseCaseOutput =
  {
    id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
    nome: 'Eduardo Conti',
    email: 'eduardo.conti@gmail.com',
    telefone: '(44)984089729',
    materiaPrimaTrabalhada: [
      {
        id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
        nome: 'fake',
      },
    ],
  };

export const mockRegistrarPedidoUseCaseInput: RegistrarPedidoUseCaseInput = {
  idCliente: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  itemPedido: [
    {
      idProduto: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
      quantidade: 1,
    },
  ],
};

export const mockRegistrarPedidoUseCaseOutput: RegistrarPedidoUseCaseOutput = {
  id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  valor: 1000,
  itemPedido: [
    {
      idProduto: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
      quantidade: 1,
    },
  ],
};

export const mockRegistrarCompraUseCaseInput: RegistrarCompraUseCaseInput = {
  idFornecedor: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  itemCompra: [
    {
      idMateriaPrima: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
      quantidade: 1,
      valor: 2000,
    },
  ],
};

export const mockRegistrarCompraUseCaseOutput: RegistrarCompraUseCaseOutput = {
  id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  valor: 2000,
  itemCompra: [
    {
      idMateriaPrima: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
      quantidade: 1,
      valor: 2000,
      valorUnitario: 2000,
    },
  ],
};
