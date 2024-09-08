import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getBloodTypeById(application: FastifyInstance) {
  application.get("/bloodtype/:id", async (request, reply) => {
    const bloodType = z.object({
      id: z.string(),
    });
    const { id } = bloodType.parse(request.params);
    console.log(id);

    const BloodtypeSelect = await prisma.tipos_Sanguineos.findUniqueOrThrow({
      where: {
        id: parseInt(id),
      },
    });
    console.log(BloodtypeSelect);

    return reply.status(201).send({ Blood_Type: BloodtypeSelect });
  });
}
