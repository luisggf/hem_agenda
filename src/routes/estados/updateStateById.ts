import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function updateStateRoute(app: FastifyInstance) {
  app.patch("/updateState/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const bodySchema = z.object({
      nome: z.string().optional(),
      sigla: z.string().length(2).optional(),
    });

    const { id } = paramsSchema.parse(request.params);
    const data = bodySchema.parse(request.body);

    try {
      const updatedEstado = await prisma.estados.update({
        where: { id: parseInt(id) },
        data,
      });

      return reply.send(updatedEstado);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to update estado" });
    }
  });
}
