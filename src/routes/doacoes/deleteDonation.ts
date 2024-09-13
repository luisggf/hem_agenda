import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { FastifyInstance } from "fastify";

export async function deleteDonation(app: FastifyInstance) {
  app.delete("/delete-donation", async (req, rep) => {
    const donationBody = z.object({
      id: z.number(),
    });
    try {
      const { id } = donationBody.parse(req.body);

      const DonationDeleted = await prisma.doacoes.delete({
        where: { id: id },
      });

      return rep.status(201).send({ DonationDeleted: { DonationDeleted } });
    } catch (error) {
      return error;
    }
  });
}
