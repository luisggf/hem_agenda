import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteStateRoute(app: FastifyInstance) {
  app.delete("/delete-state/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      await prisma.estados.delete({
        where: { id: parseInt(id) },
      });

      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: "Failed to delete estado" });
    }
  });
}
