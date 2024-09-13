import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function getDonationById(app: FastifyInstance) {
  app.get("/donation/:id", async (request, reply) => {
    const donationBody = z.object({
      id: z.string(),
    });

    const { id } = donationBody.parse(request.params);

    const donationFound = await prisma.doacoes.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });

    return reply.status(201).send(donationFound);
  });
}
