import { prisma } from "../../src/lib/prisma";
import { z } from "zod";

// Definindo schemas pelo Zod
const createEstadoSchema = z.object({
  nome: z.string(),
  sigla: z.string().length(2),
});

const createCidadeSchema = z.object({
  nome: z.string(),
  estado_id: z.number(),
});

// Função para semear estados
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

// Função para semear cidades
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

// Função para semear tipos sanguíneos
async function seedTiposSanguineos() {
  const bloodTypes = [
    { tipo: "A", fator: "+A" },
    { tipo: "A", fator: "-A" },
    { tipo: "B", fator: "+B" },
    { tipo: "B", fator: "-B" },
    { tipo: "AB", fator: "+AB" },
    { tipo: "AB", fator: "-AB" },
    { tipo: "O", fator: "+O" },
    { tipo: "O", fator: "-O" },
  ];

  // Use createMany to insert all the blood types at once
  const tipos_sanguineos = await prisma.tipos_Sanguineos.createMany({
    data: bloodTypes,
    skipDuplicates: true, // Optional: Skips insertion if a record already exists
  });

  console.log(`${tipos_sanguineos.count} blood types seeded.`);
}

// Função para semear locais de coleta
async function seedDonationLocations() {
  const donationLocations = [
    {
      nome: "Vila Maciel",
      rua: "Avenida Gury Marques",
      numero: "5684",
      complemento: "Predio Azul",
      cidade_id: 54,
    },
    {
      nome: "Parque Maracanã",
      rua: "Rua das Flores",
      numero: "123",
      complemento: "Próximo ao parque",
      cidade_id: 86,
    },
    {
      nome: "Xangri-Lá",
      rua: "Avenida Brasil",
      numero: "456",
      complemento: "Centro",
      cidade_id: 907,
    },
    {
      nome: "Helena Santana Pereira",
      rua: "Rua da Liberdade",
      numero: "789",
      complemento: "Ao lado da escola",
      cidade_id: 68,
    },
    {
      nome: "Tabapuá Brasília II (Jurema)",
      rua: "Rua da Paz",
      numero: "101",
      complemento: "Em frente à igreja",
      cidade_id: 48,
    },
    {
      nome: "Travessa Olívia",
      rua: "Avenida das Américas",
      numero: "202",
      complemento: "No shopping",
      cidade_id: 501,
    },
    {
      nome: "Residencial Sunflower",
      rua: "Rua do Comércio",
      numero: "303",
      complemento: "Centro comercial",
      cidade_id: 1002,
    },
    {
      nome: "Olavo Correia de Amorim",
      rua: "Rua do Trabalho",
      numero: "404",
      complemento: "Próximo à rodoviária",
      cidade_id: 923,
    },
    {
      nome: "Lucilo Simões de Souza",
      rua: "Avenida do Sol",
      numero: "505",
      complemento: "Esquina com Rua das Árvores",
      cidade_id: 666,
    },
  ];

  await Promise.all(
    donationLocations.map(async (location) => {
      return prisma.locais_Coleta.create({
        data: location,
      });
    })
  );

  console.log("Donation locations seeded successfully.");
}

// Função principal para executar o seeding
async function seed() {
  await seedTiposSanguineos();
  await seedEstados();
  await seedCidades();
  await seedDonationLocations(); // Add this line to seed donation locations
}

seed().then(() => {
  console.log("Seeding completed.");
});
