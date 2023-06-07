/*
  Warnings:

  - The `data_entrega` column on the `pedido` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pedido" DROP COLUMN "data_entrega",
ADD COLUMN     "data_entrega" TIMESTAMP(3);
