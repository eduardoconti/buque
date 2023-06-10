import { Compra } from '@domain/compra/entities';
import type {
  IRegistrarCompraUseCase,
  RegistrarCompraUseCaseInput,
  RegistrarCompraUseCaseOutput,
} from '@domain/compra/use-cases';
import type {
  IFornecedorRepository,
  ICompraRepository,
  IMateriaPrimaRepository,
} from '@domain/core';
import { UUID } from '@domain/value-objects';

export class RegistrarCompraUseCase implements IRegistrarCompraUseCase {
  constructor(
    private readonly materiaPrimaRepository: IMateriaPrimaRepository,
    private readonly fornecedorRepository: IFornecedorRepository,
    private readonly compraRepository: ICompraRepository,
  ) {}
  async execute({
    idFornecedor,
    itemCompra,
  }: RegistrarCompraUseCaseInput): Promise<RegistrarCompraUseCaseOutput> {
    await this.fornecedorRepository.findOne({
      id: new UUID(idFornecedor),
    });

    const items = await Promise.all(
      itemCompra.map(async (item) => {
        const materiaPrima = await this.materiaPrimaRepository.findOneById(
          new UUID(item.idMateriaPrima),
        );
        return {
          idMateriaPrima: materiaPrima.id.value,
          quantidade: item.quantidade,
          totalItem: item.valor,
        };
      }),
    );

    const compra = Compra.create({
      idFornecedor,
      itensCompra: items,
    });

    await this.compraRepository.save(compra);
    return {
      id: compra.id.value,
      itemCompra: compra.itensCompra.map((e) => {
        return {
          idMateriaPrima: e.idMateriaPrima.value,
          quantidade: e.quantidade.value,
          valor: e.totalItem.value,
          valorUnitario: e.valorUnitario.value,
        };
      }),
      valor: compra.valor.value,
    };
  }
}
