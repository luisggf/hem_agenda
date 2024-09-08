import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function updateBloodType(app: FastifyInstance) {
  app.patch("/update-blood-type", async (request, reply) => {
    const updateBloodTypeBody = z.object({
      id: z.number(),
      tipo: z.string(),
      fator: z.string(),
    });
    const { id, tipo, fator } = updateBloodTypeBody.parse(request.body);

    try {
      const updatedBloodType = await prisma.tipos_Sanguineos.update({
        data: { fator: fator, tipo: tipo, updated_at: new Date() },
        where: {
          id: id,
        },
      });
      return reply.status(201).send({
        NewBloodType: {
          updatedBloodType,
        },
      });
    } catch (error) {
      return error;
    }
  });
}
