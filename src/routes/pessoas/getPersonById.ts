import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function getPersonById(app: FastifyInstance) {
  app.get("/person/:id", async (request, reply) => {
    const PersonBody = z.object({
      id: z.string(),
    });

    const { id } = PersonBody.parse(request.params);

    const PersonFound = await prisma.pessoas.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });

    return reply.status(201).send(PersonFound);
  });
}
