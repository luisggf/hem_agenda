import fastify from "fastify";
import { CreateBloodType } from "../routes/tipos_sanguineos/CreateBloodType";
import { getBloodTypeById } from "../routes/tipos_sanguineos/GetBloodType";
import { fastifyCors } from "@fastify/cors";
import { GetAllBloodTypes } from "../routes/tipos_sanguineos/GetAllBloodTypes";
import { deleteBloodType } from "../routes/tipos_sanguineos/deleteBloodType";
import { updateBloodType } from "../routes/tipos_sanguineos/updateBloodType";

const server = fastify();

server.register(fastifyCors, {
  origin: "*",
});

// tipos sanguineos
server.register(CreateBloodType);
server.register(getBloodTypeById);
server.register(GetAllBloodTypes);
server.register(deleteBloodType);
server.register(updateBloodType);

server.listen({ port: 3333 }).then(() => {
  console.log("server running");
});
