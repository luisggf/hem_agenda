import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { FastifyInstance } from "fastify";

export async function createDonationLocal(app: FastifyInstance) {
  app.post("/new-donation-local", async (req, rep) => {
    const donationBody = z.object({
      nome: z.string(),
      rua: z.string(),
      numero: z.string(),
      compl: z.string(),
      cidade_id: z.number(),
    });
    const { nome, rua, numero, compl, cidade_id } = donationBody.parse(
      req.body
    );
    try {
      const createdLocal = await prisma.locais_Coleta.create({
        data: {
          nome: nome,
          rua: rua,
          numero: numero,
          complemento: compl,
          created_at: new Date(),
          updated_at: new Date(),
          cidade: {
            connect: { id: cidade_id },
          },
        },
      });
      console.log(createdLocal);
      return rep.status(201).send({ Donation_Local: { createdLocal } });
    } catch (error) {
      return error;
    }
  });
}
