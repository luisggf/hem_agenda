import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function CreateBloodType(application: FastifyInstance) {
  application.post("/create_blood_type", async (request, reply) => {
    const createBloodTypeBody = z.object({
      tipo: z.string(),
      fator: z.string(),
    });

    const { tipo, fator } = createBloodTypeBody.parse(request.body);

    const BloodType = await prisma.tipos_Sanguineos.create({
      data: {
        tipo: tipo,
        fator: fator,
      },
    });
    return reply
      .status(201)
      .send({ Blood_ID: BloodType.id, Type: BloodType.tipo });
  });
}
