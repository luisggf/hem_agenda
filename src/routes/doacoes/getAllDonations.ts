import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getAllDonations(app: FastifyInstance) {
  app.get("/getAllDonations", async (_, reply) => {
    try {
      const donations = await prisma.doacoes.findMany();
      return reply.send(donations);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch donations" });
    }
  });
}
