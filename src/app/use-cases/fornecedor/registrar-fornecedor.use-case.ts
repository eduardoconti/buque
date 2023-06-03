import type {
  IUseCase,
  IFornecedorRepository,
  IMateriaPrimaRepository,
} from '@domain/core';
import { Fornecedor } from '@domain/entities/fornecedor';
import { UUID } from '@domain/value-objects';

export interface RegistrarFornecedorUseCaseOutput {
  nome: string;
  email?: string;
  telefone: string;
  site?: string;
  materiaPrimaTrabalhada?: { id: string; nome: string }[];
  id: string;
}
export interface RegistrarFornecedorUseCaseInput {
  nome: string;
  email?: string;
  telefone: string;
  site?: string;
  materiaPrimaTrabalhada?: { id: string }[];
}

export type IRegistrarFornecedorUseCase = IUseCase<
  RegistrarFornecedorUseCaseInput,
  RegistrarFornecedorUseCaseOutput
>;
export class RegistrarFornecedorUseCase implements IRegistrarFornecedorUseCase {
  constructor(
    private readonly fornecedorRepository: IFornecedorRepository,
    private readonly materiaPrimaRepository: IMateriaPrimaRepository,
  ) {}

  async execute({
    nome,
    email,
    telefone,
    site,
    materiaPrimaTrabalhada,
  }: RegistrarFornecedorUseCaseInput): Promise<RegistrarFornecedorUseCaseOutput> {
    const fornecedor = Fornecedor.create({
      nome,
      email,
      telefone,
      site,
    });

    const materiaPrimaPrimitivos: { id: string; nome: string }[] = [];

    if (materiaPrimaTrabalhada) {
      const materiaPrima = await Promise.all(
        materiaPrimaTrabalhada.map((e) =>
          this.materiaPrimaRepository.findOneById(new UUID(e.id)),
        ),
      );
      materiaPrima.map((e) => {
        const primitives = e.toPrimitives();
        materiaPrimaPrimitivos.push(primitives);
        fornecedor.adicionaMateriaPrimaTrabalhada(primitives);
      });
    }

    const saved = await this.fornecedorRepository.save(fornecedor);

    return {
      id: saved.id.value,
      nome: saved.nome.value,
      email: saved.email?.value,
      telefone: saved.telefone,
      site: saved.props.site,
      materiaPrimaTrabalhada: materiaPrimaPrimitivos,
    };
  }
}
