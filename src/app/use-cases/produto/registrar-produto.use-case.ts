import type {
  IMateriaPrimaRepository,
  IProdutoRepository,
  IUseCase,
} from '@domain/core';
import type { PropriedadesPrimitivasProdutoMateriaPrima } from '@domain/produto/entities';
import { Produto } from '@domain/produto/entities';
import { UUID } from '@domain/value-objects';

export interface RegistraProdutoUseCaseInput {
  nome: string;
  descricao: string;
  itenMateriaPrima: Pick<
    PropriedadesPrimitivasProdutoMateriaPrima,
    'quantidade' | 'idMateriaPrima'
  >[];
  codigo: number;
}

export interface RegistraProdutoUseCaseOutput {
  id: string;
  codigo: number;
  nome: string;
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
    itenMateriaPrima,
    codigo,
  }: RegistraProdutoUseCaseInput): Promise<RegistraProdutoUseCaseOutput> {
    await Promise.all(
      itenMateriaPrima.map((e) =>
        this.materiaPrimaRepository.findOneById(new UUID(e.idMateriaPrima)),
      ),
    );

    const produto = Produto.create({
      nome,
      descricao,
      produtoMateriaPrima: itenMateriaPrima,
      codigo,
    });

    await this.produtoRepository.save(produto);
    return { id: produto.id.value, nome, codigo: produto.props.codigo };
  }
}
