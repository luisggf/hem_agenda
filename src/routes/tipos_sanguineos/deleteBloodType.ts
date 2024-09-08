import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteBloodType(app: FastifyInstance) {
  app.delete("/delete-blood-type/:id_to_delete", async (request, reply) => {
    const deletePollBody = z.object({
      id_to_delete: z.string(),
    });
    const { id_to_delete } = deletePollBody.parse(request.params);
    console.log(id_to_delete);

    try {
      const bloodTypeDeleted = await prisma.tipos_Sanguineos.delete({
        where: {
          id: parseInt(id_to_delete),
        },
      });
      return reply.status(201).send({ BloodType: bloodTypeDeleted.id });
    } catch (error) {
      return error;
    }
  });
}
