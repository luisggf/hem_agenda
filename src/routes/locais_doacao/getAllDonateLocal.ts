import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetAllDonationsLocal(application: FastifyInstance) {
  application.get("/getDonationsLocal", async (request, reply) => {
    const DonationsLocal = await prisma.locais_Coleta.findMany();
    return reply.status(201).send({ DonationsLocal });
  });
}
