import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getCityById(app: FastifyInstance) {
  // Get a single Cidade by ID
  app.get("/city/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      const cidade = await prisma.cidades.findUnique({
        where: { id: parseInt(id) },
      });

      if (!cidade) {
        return reply.status(404).send({ error: "Cidade not found" });
      }

      return reply.send(cidade);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch cidade" });
    }
  });
}
