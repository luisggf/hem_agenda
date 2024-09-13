import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deletePersonRegister(app: FastifyInstance) {
  app.delete("/delete-person/:id_to_delete", async (request, reply) => {
    const deletePersonBody = z.object({
      id_to_delete: z.string(),
    });
    const { id_to_delete } = deletePersonBody.parse(request.params);
    console.log(id_to_delete);

    try {
      const personDeleted = await prisma.pessoas.delete({
        where: {
          id: parseInt(id_to_delete),
        },
      });
      return reply.status(201).send({ Pessoa: personDeleted.id });
    } catch (error) {
      return error;
    }
  });
}
