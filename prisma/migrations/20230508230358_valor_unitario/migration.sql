/*
  Warnings:

  - You are about to drop the column `materia_primaId` on the `produto_materia_prima` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "produto_materia_prima" DROP CONSTRAINT "produto_materia_prima_materia_primaId_fkey";

-- AlterTable
ALTER TABLE "produto_materia_prima" DROP COLUMN "materia_primaId";

-- AddForeignKey
ALTER TABLE "produto_materia_prima" ADD CONSTRAINT "produto_materia_prima_id_materiaPrima_fkey" FOREIGN KEY ("id_materiaPrima") REFERENCES "materia_prima"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
