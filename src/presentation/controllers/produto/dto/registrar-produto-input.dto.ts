import type { RegistraProdutoUseCaseInput } from '@app/use-cases/produto';

export class RegistrarProdutoInput {
  nome!: string;
  descricao!: string;
  materia_prima!: { id: string; quantidade: number }[];
  codigo!: number;

  static mapToUseCaseInput({
    nome,
    descricao,
    materia_prima,
    codigo,
  }: RegistrarProdutoInput): RegistraProdutoUseCaseInput {
    return {
      nome,
      descricao,
      codigo,
      itenMateriaPrima: materia_prima.map((e) => {
        return { ...e, idMateriaPrima: e.id };
      }),
    };
  }
}
