/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `produto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `preco_custo` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "preco_custo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "produto_nome_key" ON "produto"("nome");
