import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteDonationLocal(app: FastifyInstance) {
  app.delete("/delete-donation-local/:id_to_delete", async (request, reply) => {
    const deleteLocalBody = z.object({
      id_to_delete: z.string(),
    });
    const { id_to_delete } = deleteLocalBody.parse(request.params);
    console.log(id_to_delete);

    try {
      const localDeleted = await prisma.locais_Coleta.delete({
        where: {
          id: parseInt(id_to_delete),
        },
      });
      return reply.status(201).send({ Local: localDeleted.id });
    } catch (error) {
      return error;
    }
  });
}
