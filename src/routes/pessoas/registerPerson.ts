import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function registerPerson(application: FastifyInstance) {
  application.post("/register-person", async (request, reply) => {
    const personRegister = z.object({
      nome: z.string(),
      rg: z.string(),
      rua: z.string(),
      numero: z.string(),
      complemento: z.string(),
      tipo_sanguineo_id: z.number(),
      cidade_id: z.number(),
    });

    const { nome, rg, rua, numero, complemento, tipo_sanguineo_id, cidade_id } =
      personRegister.parse(request.body);

    const NewPerson = await prisma.pessoas.create({
      data: {
        nome: nome,
        rg: rg,
        rua: rua,
        numero: numero,
        complemento: complemento,
        tipo_sanguineo: {
          connect: { id: tipo_sanguineo_id },
        },
        Cidade: {
          connect: {
            id: cidade_id,
          },
        },
      },
    });
    return reply.status(201).send({ Person_Created: { NewPerson } });

    2;
  });
}
