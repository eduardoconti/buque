-- CreateTable
CREATE TABLE "estoque_materia_prima" (
    "id" TEXT NOT NULL,
    "id_materia_prima" TEXT NOT NULL,
    "data_inclusao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL,
    "id_compra" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "custo_unitario" INTEGER NOT NULL,
    "encerrado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "estoque_materia_prima_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "estoque_materia_prima" ADD CONSTRAINT "estoque_materia_prima_id_compra_fkey" FOREIGN KEY ("id_compra") REFERENCES "compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_materia_prima" ADD CONSTRAINT "estoque_materia_prima_id_materia_prima_fkey" FOREIGN KEY ("id_materia_prima") REFERENCES "materia_prima"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
