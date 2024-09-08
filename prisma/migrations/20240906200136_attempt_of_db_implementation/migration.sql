-- CreateTable
CREATE TABLE "Doacoes" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pessoa_id" INTEGER NOT NULL,
    "local_id" INTEGER NOT NULL,

    CONSTRAINT "Doacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estados" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pessoas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "tipo_id" INTEGER NOT NULL,
    "cidade_id" INTEGER NOT NULL,

    CONSTRAINT "Pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidades" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "estado_id" INTEGER NOT NULL,

    CONSTRAINT "Cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locais_Coleta" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cidade_id" INTEGER NOT NULL,

    CONSTRAINT "Locais_Coleta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipos_Sanguineos" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "fator" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tipos_Sanguineos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Doacoes" ADD CONSTRAINT "Doacoes_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "Locais_Coleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacoes" ADD CONSTRAINT "Doacoes_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "Pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoas" ADD CONSTRAINT "Pessoas_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "Cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoas" ADD CONSTRAINT "Pessoas_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "Tipos_Sanguineos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidades" ADD CONSTRAINT "Cidades_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locais_Coleta" ADD CONSTRAINT "Locais_Coleta_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "Cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
