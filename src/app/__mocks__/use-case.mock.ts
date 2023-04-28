import {
  RegisterUserUseCaseInput,
  RegisterUserUseCaseOutput,
  UserAuthUseCaseInput,
} from '@app/use-cases';

export const mockRegisterUserUseCaseInput: RegisterUserUseCaseInput = {
  name: 'Eduardo Conti',
  email: 'eduardo.conti@gmail.com',
  password: 'teste@123',
};

export const mockRegisterUserUseCaseOutput: RegisterUserUseCaseOutput = {
  id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  name: 'Eduardo Conti',
  email: 'eduardo.conti@gmail.com',
};

export const mockUserAuthUseCaseInput: UserAuthUseCaseInput = {
  userName: 'eduardo.conti@gmail.com',
  password: 'teste@123',
};
