import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetAllBloodTypes(application: FastifyInstance) {
  application.get("/getAllBloodTypes", async (request, reply) => {
    const BloodTypeList = await prisma.tipos_Sanguineos.findMany();
    return reply.status(201).send({ BloodTypeList });
  });
}
