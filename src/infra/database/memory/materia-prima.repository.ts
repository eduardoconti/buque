import { mockMateriaPrimaEntity } from '@domain/__mocks__';
import type { IMateriaPrimaRepository } from '@domain/core';
import type { MateriaPrima } from '@domain/materia-prima/entities';
import type { UUID } from '@domain/value-objects';

import { timeoutDelay } from '@infra/utils/timeout';
const DELAY = 500;

const materiasPrima: MateriaPrima[] = [mockMateriaPrimaEntity];
export class MateriaPrimaMemoryRepository implements IMateriaPrimaRepository {
  async findOneById(id: UUID): Promise<MateriaPrima> {
    await timeoutDelay(DELAY);
    const materiaPrima = materiasPrima.find((e) => e.id.equals(id));
    if (!materiaPrima) {
      throw new Error('materia prima nao encontrada');
    }
    return materiaPrima;
  }

  async save(materiaPrima: MateriaPrima): Promise<MateriaPrima> {
    await timeoutDelay(DELAY);
    materiasPrima.push(materiaPrima);
    return materiaPrima;
  }
}
