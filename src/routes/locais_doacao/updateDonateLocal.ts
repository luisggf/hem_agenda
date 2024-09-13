import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function updateDonationLocal(app: FastifyInstance) {
  app.patch("/update-donation-local", async (req, reply) => {
    const updateBody = z.object({
      id_to_update: z.number(),
      nome: z.string(),
      rua: z.string(),
      numero: z.string(),
      complemento: z.string(),
      cidade_id: z.number(),
    });
    try {
      const { id_to_update, nome, rua, numero, complemento, cidade_id } =
        updateBody.parse(req.body);

      const UpdatedDonationLocal = await prisma.locais_Coleta.update({
        data: {
          nome: nome,
          complemento: complemento,
          numero: numero,
          rua: rua,
          updated_at: new Date(),
          cidade: { connect: { id: cidade_id } },
        },
        where: { id: id_to_update },
      });

      return reply.status(201).send(UpdatedDonationLocal);
    } catch (error) {
      return reply.status(400).send({ "Bad Request:": error });
    }
  });
}
