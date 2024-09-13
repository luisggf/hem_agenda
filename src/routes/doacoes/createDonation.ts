import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { FastifyInstance } from "fastify";

export async function createDonation(app: FastifyInstance) {
  app.post("/register-donation", async (req, rep) => {
    const donationBody = z.object({
      pessoa_id: z.number(),
      local_id: z.number(),
    });
    try {
      const { pessoa_id, local_id } = donationBody.parse(req.body);
      const Donation = await prisma.doacoes.create({
        data: {
          data: new Date(),

          local: {
            connect: { id: local_id },
          },
          pessoa: {
            connect: { id: pessoa_id },
          },
        },
      });
      return rep.status(201).send({ Donation: { Donation } });
    } catch (error) {
      return error;
    }
  });
}
