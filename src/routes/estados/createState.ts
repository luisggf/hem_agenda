import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createStateRoute(app: FastifyInstance) {
  app.post("/createState", async (request, reply) => {
    const createEstadoSchema = z.object({
      nome: z.string(),
      sigla: z.string().length(2),
    });

    const { nome, sigla } = createEstadoSchema.parse(request.body);

    try {
      const newEstado = await prisma.estados.create({
        data: {
          nome,
          sigla,
        },
      });

      return reply.status(201).send(newEstado);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to create estado" });
    }
  });
}
