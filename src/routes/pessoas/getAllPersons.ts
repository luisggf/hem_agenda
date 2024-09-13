import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetAllPersons(application: FastifyInstance) {
  application.get("/getPersons", async (request, reply) => {
    const Pessoas = await prisma.pessoas.findMany();
    return reply.status(201).send({ Pessoas });
  });
}
