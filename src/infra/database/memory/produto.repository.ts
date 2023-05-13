import type { IProdutoRepository } from '@domain/core';
import type { Produto } from '@domain/produto/entities';
import type { Nome, UUID } from '@domain/value-objects';

import { timeoutDelay } from '@infra/utils/timeout';
const DELAY = 500;

const produtos: Produto[] = [];
export class ProdutoMemoryRepository implements IProdutoRepository {
  async findOneById(id: UUID): Promise<Produto> {
    await timeoutDelay(DELAY);
    const produto = produtos.find((e) => e.id.equals(id));
    if (!produto) {
      throw new Error('prduto nao encontrado');
    }
    return produto;
  }

  async save(produto: Produto): Promise<Produto> {
    await timeoutDelay(DELAY);
    produtos.push(produto);
    return produto;
  }

  async exists(nome: Nome): Promise<boolean> {
    await timeoutDelay(DELAY);
    return produtos.find((e) => e.nome.equals(nome)) ? true : false;
  }
}
