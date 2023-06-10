/*
  Warnings:

  - Added the required column `total_item` to the `itens_compra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "itens_compra" ADD COLUMN     "total_item" INTEGER NOT NULL;
