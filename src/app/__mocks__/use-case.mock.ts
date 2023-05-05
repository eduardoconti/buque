import type {
  RegisterUserUseCaseInput,
  RegisterUserUseCaseOutput,
  UserAuthUseCaseInput,
} from '@app/use-cases';

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
