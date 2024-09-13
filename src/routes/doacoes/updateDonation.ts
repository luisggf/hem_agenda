import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { FastifyInstance } from "fastify";

export async function updateDonation(app: FastifyInstance) {
  app.patch("/register-donation", async (req, rep) => {
    const donationBody = z.object({
      id: z.number(),
      data: z.date(),
      pessoa_id: z.number(),
      local_id: z.number(),
    });
    const { id, data, pessoa_id, local_id } = donationBody.parse(req.body);

    const DonationUpdated = prisma.doacoes.update({
      data: {
        data: data,

        local: {
          connect: { id: local_id },
        },
        pessoa: {
          connect: { id: pessoa_id },
        },
      },
      where: { id: id },
    });

    return rep.status(201).send({ DonationUpdated: { DonationUpdated } });
  });
}
