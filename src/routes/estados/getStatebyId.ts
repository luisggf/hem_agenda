import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getStateByIdRoute(app: FastifyInstance) {
  app.get("/estados/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      const estado = await prisma.estados.findUnique({
        where: { id: parseInt(id) },
      });

      if (!estado) {
        return reply.status(404).send({ error: "Estado not found" });
      }

      return reply.send(estado);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch estado" });
    }
  });
}
