import { TokenPayload } from '@app/contracts';

import { RegisterUserInput } from '@presentation/dto';

export const mockRegisterUserInput: RegisterUserInput = {
  name: 'Eduardo Ferreira Conti',
  email: 'es.eduardoconti@gmail.com',
  password: 'teste@123',
};

export const mockRegisterUserInputRequiredFields: RegisterUserInput = {
  name: 'Eduardo Ferreira Conti',
  email: 'es.eduardoconti@gmail.com',
  password: 'teste@123',
};

export const mockTokenPayload: TokenPayload = {
  userId: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  userName: 'es.eduardoconti@gmail.com',
};
