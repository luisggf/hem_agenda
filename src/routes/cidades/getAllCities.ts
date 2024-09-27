import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getAllCities(app: FastifyInstance) {
  app.get("/cities", async (_, reply) => {
    try {
      const cidades = await prisma.cidades.findMany({
        orderBy: {
          nome: "asc", // Order by 'nome' field in ascending order (alphabetically)
        },
      });
      return reply.send(cidades);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch cidades" });
    }
  });
}
