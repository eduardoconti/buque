/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockRegistrarMateriaPrimaUseCase } from '@app/__mocks__';
import { provideRegistrarMateriaPrimaUseCase } from '@app/app.provider';

import { mockMateriaPrimaEntity } from '@domain/__mocks__';
import type { IMateriaPrimaRepository } from '@domain/core';

import { MateriaPrimaRepository } from '@infra/database/prisma';

import type { IRegistrarMateriaPrimaUseCase } from './registrar-materia-prima.use-case';
import { RegistrarMateriaPrimaUseCase } from './registrar-materia-prima.use-case';

describe('RegistrarMateriaPrimauseCase', () => {
  let registrarMateriaPrimauseCase: IRegistrarMateriaPrimaUseCase;
  let materiaPrimaRepository: IMateriaPrimaRepository;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideRegistrarMateriaPrimaUseCase,
        {
          provide: MateriaPrimaRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    registrarMateriaPrimauseCase = app.get<IRegistrarMateriaPrimaUseCase>(
      RegistrarMateriaPrimaUseCase,
    );
    materiaPrimaRepository = app.get<IMateriaPrimaRepository>(
      MateriaPrimaRepository,
    );
  });

  it('should be defined', () => {
    expect(registrarMateriaPrimauseCase).toBeDefined();
    expect(materiaPrimaRepository).toBeDefined();
  });

  it('deve executar com sucesso', async () => {
    jest
      .spyOn(materiaPrimaRepository, 'save')
      .mockResolvedValue(mockMateriaPrimaEntity);
    const result = await registrarMateriaPrimauseCase.execute(
      mockRegistrarMateriaPrimaUseCase,
    );

    expect(result).toStrictEqual({
      id: expect.any(String),
      descricao: mockMateriaPrimaEntity.props.descricao,
      nome: mockMateriaPrimaEntity.nome.value,
      valorUnitario: 1000,
    });

    expect(materiaPrimaRepository.save).toBeCalledTimes(1);
  });
});
