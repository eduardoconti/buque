import type { IMateriaPrimaRepository, IUseCase } from '@domain/core';
import { MateriaPrima } from '@domain/materia-prima/entities';

export interface RegistrarMateriaPrimaUseCaseInput {
  nome: string;
  descricao: string;
  valorUnitario: number;
}

export interface RegistrarMateriaPrimaUseCaseOutput {
  id: string;
  nome: string;
  descricao: string;
  valorUnitario: number;
}

export type IRegistrarMateriaPrimaUseCase = IUseCase<
  RegistrarMateriaPrimaUseCaseInput,
  RegistrarMateriaPrimaUseCaseOutput
>;

export class RegistrarMateriaPrimaUseCase
  implements IRegistrarMateriaPrimaUseCase
{
  constructor(
    private readonly materiaPrimaRepository: IMateriaPrimaRepository,
  ) {}

  async execute({
    nome,
    descricao,
    valorUnitario,
  }: RegistrarMateriaPrimaUseCaseInput): Promise<RegistrarMateriaPrimaUseCaseOutput> {
    const materiaPrima = MateriaPrima.create({
      nome,
      descricao,
      valorUnitario,
    });

    await this.materiaPrimaRepository.save(materiaPrima);
    return {
      id: materiaPrima.id.value,
      nome,
      descricao,
      valorUnitario,
    };
  }
}
