import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteCity(app: FastifyInstance) {
  // Delete Cidade by ID
  app.delete("/delete-city/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      const cityDeleted = await prisma.cidades.delete({
        where: { id: parseInt(id) },
      });

      return reply.status(204).send({ cityDeleted: { cityDeleted } });
    } catch (error) {
      return reply.status(500).send({ error: "Failed to delete cidade" });
    }
  });
}
