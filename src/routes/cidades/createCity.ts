import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createCity(app: FastifyInstance) {
  app.post("/create-city", async (request, reply) => {
    const createCidadeSchema = z.object({
      nome: z.string(),
      estado_id: z.number(),
    });

    const { nome, estado_id } = createCidadeSchema.parse(request.body);

    try {
      const newCidade = await prisma.cidades.create({
        data: {
          nome,
          estado: { connect: { id: estado_id } },
        },
      });

      return reply.status(201).send(newCidade);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to create cidade" });
    }
  });
}
