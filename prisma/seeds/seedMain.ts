import { prisma } from "../../src/lib/prisma";
import { z } from "zod";

// definindo schemas pelo Zod
const createEstadoSchema = z.object({
  nome: z.string(),
  sigla: z.string().length(2),
});

const createCidadeSchema = z.object({
  nome: z.string(),
  estado_id: z.number(),
});

async function seedEstados() {
  try {
    const estadosResponse = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    const estadosData = await estadosResponse.json();

    const parsedEstados = z.array(createEstadoSchema).safeParse(estadosData);

    if (!parsedEstados.success) {
      console.error(
        "Failed to parse estados data:",
        parsedEstados.error.format()
      );
      return;
    }

    const estados = await Promise.all(
      parsedEstados.data.map(async (estado) => {
        return prisma.estados.create({
          data: {
            nome: estado.nome,
            sigla: estado.sigla,
          },
        });
      })
    );

    console.log("Estados seeded successfully.");
    return estados;
  } catch (error) {
    console.error("Error seeding estados:", error);
  }
}

async function seedCidades() {
  try {
    const estados = await prisma.estados.findMany();

    for (const estado of estados) {
      const cidadesResponse = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.sigla}/distritos`
      );
      const cidadesData = await cidadesResponse.json();

      const parsedCidades = z
        .array(z.object({ nome: z.string() }))
        .safeParse(cidadesData);

      if (!parsedCidades.success) {
        console.error(
          `Failed to parse cidades data for ${estado.nome}:`,
          parsedCidades.error.format()
        );
        continue;
      }

      await Promise.all(
        parsedCidades.data.map(async (cidade) => {
          const validCidade = createCidadeSchema.safeParse({
            nome: cidade.nome,
            estado_id: estado.id,
          });

          if (!validCidade.success) {
            console.error("Invalid cidade data:", validCidade.error.format());
            return;
          }

          return prisma.cidades.create({
            data: validCidade.data,
          });
        })
      );

      console.log(`Cidades for ${estado.nome} seeded successfully.`);
    }
  } catch (error) {
    console.error("Error seeding cidades:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seed() {
  await seedEstados();
  await seedCidades();
}

seed().then(() => {
  console.log("Seeding completed.");
});
