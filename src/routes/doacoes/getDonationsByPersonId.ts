import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma"; // Adjust the import path as needed
import { z } from "zod";

const getDonationsSchema = z.object({
  person_id: z.string(),
});

export async function personDonations(fastify: FastifyInstance) {
  fastify.get("/donations-from-person/:person_id", async (request, reply) => {
    try {
      const { person_id } = getDonationsSchema.parse(request.params);
      console.log(person_id);

      const donations = await prisma.doacoes.findMany({
        where: {
          pessoa_id: parseInt(person_id),
        },
        include: {
          local: true,
        },
      });

      if (donations.length === 0) {
        return reply
          .status(404)
          .send({ error: "No donations found for this person" });
      }

      return reply.status(200).send(donations);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ error: "Invalid person_id" });
      }

      console.error(error);
      return reply
        .status(500)
        .send({ error: "An error occurred while fetching donations" });
    }
  });
}
