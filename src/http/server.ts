import fastify from "fastify";
import { CreateBloodType } from "../routes/tipos_sanguineos/CreateBloodType";
import { getBloodTypeById } from "../routes/tipos_sanguineos/GetBloodType";
import { fastifyCors } from "@fastify/cors";
import { GetAllBloodTypes } from "../routes/tipos_sanguineos/GetAllBloodTypes";
import { deleteBloodType } from "../routes/tipos_sanguineos/deleteBloodType";
import { updateBloodType } from "../routes/tipos_sanguineos/updateBloodType";
import { createCity } from "../routes/cidades/createCity";
import { getCityById } from "../routes/cidades/getCitybyId";
import { getAllCities } from "../routes/cidades/getAllCities";
import { deleteCity } from "../routes/cidades/deleteCity";
import { updateCity } from "../routes/cidades/updateCity";
import { createStateRoute } from "../routes/estados/createState";
import { getStateByIdRoute } from "../routes/estados/getStatebyId";
import { getAllStates } from "../routes/estados/getAllStates";
import { deleteStateRoute } from "../routes/estados/deleteStateById";
import { updateStateRoute } from "../routes/estados/updateStateById";
import { registerPerson } from "../routes/pessoas/registerPerson";
import { getPersonById } from "../routes/pessoas/getPersonById";
import { updatePerson } from "../routes/pessoas/updatePerson";

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

// cidade
server.register(createCity);
server.register(getCityById);
server.register(getAllCities);
server.register(deleteCity);
server.register(updateCity);

// estados
server.register(createStateRoute);
server.register(getStateByIdRoute);
server.register(getAllStates);
server.register(deleteStateRoute);
server.register(updateStateRoute);

// pessoa
server.register(registerPerson);
server.register(getPersonById);
server.register(updatePerson);

server.listen({ port: 3333 }).then(() => {
  console.log("server running");
});
