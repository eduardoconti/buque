import type {
  IClienteRepository,
  IPedidoRepository,
  IProdutoRepository,
} from '@domain/core';
import { Pedido } from '@domain/pedido/entities';
import type {
  IRegistrarPedidoUseCase,
  RegistrarPedidoUseCaseInput,
  RegistrarPedidoUseCaseOutput,
} from '@domain/pedido/use-cases';
import { UUID } from '@domain/value-objects';

export class RegistrarPedidoUseCase implements IRegistrarPedidoUseCase {
  constructor(
    private readonly produtoRepository: IProdutoRepository,
    private readonly clienteRepository: IClienteRepository,
    private readonly pedidoRepository: IPedidoRepository,
  ) {}
  async execute({
    idCliente,
    itemPedido,
    dataEntrega,
  }: RegistrarPedidoUseCaseInput): Promise<RegistrarPedidoUseCaseOutput> {
    await this.clienteRepository.findOne({
      id: new UUID(idCliente),
    });

    const items = await Promise.all(
      itemPedido.map(async (item) => {
        const produto = await this.produtoRepository.findOneById(
          new UUID(item.idProduto),
        );
        return {
          produto: produto.toPrimitives(),
          quantidade: item.quantidade,
        };
      }),
    );

    const pedido = Pedido.create({
      idCliente,
      dataEntrega,
      itensPedido: items,
    });

    await this.pedidoRepository.save(pedido);
    return {
      id: pedido.id.value,
      itemPedido,
      valor: pedido.valor.value,
      dataEntrega: pedido.dataEntrega?.value,
    };
  }
}
