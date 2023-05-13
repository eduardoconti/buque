import type {
  IMateriaPrimaRepository,
  IProdutoRepository,
  IUseCase,
} from '@domain/core';
import { Produto } from '@domain/produto/entities';
import { UUID } from '@domain/value-objects';

export interface RegistraProdutoUseCaseInput {
  nome: string;
  descricao: string;
  itemMateriaPrima: { idMateriaPrima: string; quantidade: number }[];
  valor: number;
}

export interface RegistraProdutoUseCaseOutput {
  id: string;
  nome: string;
  valor: number;
  descricao: string;
  itemMateriaPrima: { id: string; nome: string; quantidade: number }[];
  precoCusto: number;
}

export type IRegistraProdutoUseCase = IUseCase<
  RegistraProdutoUseCaseInput,
  RegistraProdutoUseCaseOutput
>;
export class RegistraProdutoUseCase implements IRegistraProdutoUseCase {
  constructor(
    private readonly produtoRepository: IProdutoRepository,
    private readonly materiaPrimaRepository: IMateriaPrimaRepository,
  ) {}
  async execute({
    nome,
    descricao,
    itemMateriaPrima,
    valor,
  }: RegistraProdutoUseCaseInput): Promise<RegistraProdutoUseCaseOutput> {
    const materias = await Promise.all(
      itemMateriaPrima.map(async (e) => {
        const materia = await this.materiaPrimaRepository.findOneById(
          new UUID(e.idMateriaPrima),
        );

        return { quantidade: e.quantidade, materia };
      }),
    );

    const produto = Produto.create({
      nome,
      descricao,
      produtoMateriaPrima: materias.map((e) => {
        return {
          quantidade: e.quantidade,
          materiaPrima: e.materia.toPrimitives(),
        };
      }),
      valor,
    });

    await this.produtoRepository.save(produto);
    return {
      id: produto.id.value,
      nome,
      valor: produto.valor.value,
      descricao,
      itemMateriaPrima: materias.map(({ quantidade, materia }) => {
        return {
          id: materia.id.value,
          nome: materia.nome.value,
          quantidade: quantidade,
        };
      }),
      precoCusto: produto.calculaCusto(),
    };
  }
}
