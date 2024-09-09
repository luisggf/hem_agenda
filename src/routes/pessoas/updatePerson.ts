import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function updatePerson(app: FastifyInstance) {
  app.patch("/update-people-register", async (req, reply) => {
    const updateBody = z.object({
      id_to_update: z.number(),
      nome: z.string(),
      rg: z.string(),
      rua: z.string(),
      numero: z.string(),
      complemento: z.string(),
      tipo_sanguineo_id: z.number(),
      cidade_id: z.number(),
    });
    try {
      const {
        id_to_update,
        nome,
        rg,
        rua,
        numero,
        complemento,
        tipo_sanguineo_id,
        cidade_id,
      } = updateBody.parse(req.body);

      const UpdatedBody = await prisma.pessoas.update({
        data: {
          nome: nome,
          rg: rg,
          complemento: complemento,
          numero: numero,
          rua: rua,
          tipo_sanguineo: { connect: { id: tipo_sanguineo_id } },
          Cidade: { connect: { id: cidade_id } },
        },
        where: { id: id_to_update },
      });

      console.log(UpdatedBody);
      return reply.status(201).send(UpdatedBody);
    } catch (error) {
      return reply.status(400).send({ "Bad Request:": error });
    }
  });
}
