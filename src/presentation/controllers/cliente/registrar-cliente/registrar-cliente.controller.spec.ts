import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockRegistrarClienteUseCaseOutput } from '@app/__mocks__';
import type { IRegistrarClienteUseCase } from '@app/use-cases/cliente';
import { RegistrarClienteUseCase } from '@app/use-cases/cliente';

import { mockRegistrarClienteInput } from '@presentation/__mocks__';

import { RegistrarClienteController } from './registrar-cliente.controller';

describe('RegistrarClienteController', () => {
  let controller: RegistrarClienteController;
  let registerUserUseCase: IRegistrarClienteUseCase;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegistrarClienteController],
      providers: [
        {
          provide: RegistrarClienteUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get(RegistrarClienteController);
    registerUserUseCase = app.get<IRegistrarClienteUseCase>(
      RegistrarClienteUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(registerUserUseCase).toBeDefined();
  });

  it('deve executar com sucesso', async () => {
    jest
      .spyOn(registerUserUseCase, 'execute')
      .mockResolvedValue(mockRegistrarClienteUseCaseOutput);
    const result = await controller.handle(mockRegistrarClienteInput);
    expect(result).toStrictEqual({
      email: 'eduardo.conti@gmail.com',
      id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
      nome: 'Eduardo Conti',
      telefone: '(44)984089729',
    });
    expect(registerUserUseCase.execute).toBeCalled();
  });
});
