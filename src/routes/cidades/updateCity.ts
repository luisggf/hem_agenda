import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function updateCity(app: FastifyInstance) {
  app.patch("/update-city/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const bodySchema = z.object({
      nome: z.string().optional(),
      estado_id: z.number().optional(),
    });

    const { id } = paramsSchema.parse(request.params);
    const data = bodySchema.parse(request.body);

    try {
      const updatedCidade = await prisma.cidades.update({
        where: { id: parseInt(id) },
        data,
      });

      return reply.send(updatedCidade);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to update cidade" });
    }
  });
}
