import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getAllStates(app: FastifyInstance) {
  app.get("/getAllStates", async (_, reply) => {
    try {
      const estados = await prisma.estados.findMany();
      return reply.send(estados);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch estados" });
    }
  });
}
