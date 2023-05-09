/*
  Warnings:

  - You are about to drop the column `codigo` on the `produto` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "produto_codigo_key";

-- AlterTable
ALTER TABLE "cliente" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "produto" DROP COLUMN "codigo";
