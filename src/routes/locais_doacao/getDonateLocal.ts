import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function getDonationLocalById(app: FastifyInstance) {
  app.get("/donation-local/:id", async (request, reply) => {
    const donationLocalBody = z.object({
      id: z.string(),
    });
    try {
      const { id } = donationLocalBody.parse(request.params);
      const donationLocalFound = await prisma.locais_Coleta.findUniqueOrThrow({
        where: { id: parseInt(id) },
      });

      return reply.status(201).send(donationLocalFound);
    } catch (error) {
      return reply.status(400).send({ Erro: error });
    }
  });
}
