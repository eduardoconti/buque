import type {
  RegisterUserUseCaseInput,
  RegisterUserUseCaseOutput,
  UserAuthUseCaseInput,
} from '@app/use-cases';
import type { RegistrarMateriaPrimaUseCaseInput } from '@app/use-cases/materia-prima';
import type { RegistraProdutoUseCaseInput } from '@app/use-cases/produto';

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
  codigo: 999,
  descricao: 'fake descricao',
  nome: 'fake nome',
  itenMateriaPrima: [
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
