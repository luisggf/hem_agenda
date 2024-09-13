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
import { deletePersonRegister } from "../routes/pessoas/deletePerson";
import { GetAllPersons } from "../routes/pessoas/getAllPersons";
import { updateDonation } from "../routes/doacoes/updateDonation";
import { createDonation } from "../routes/doacoes/createDonation";
import { getDonationById } from "../routes/doacoes/getDonations";
import { deleteDonation } from "../routes/doacoes/deleteDonation";
import { getAllDonations } from "../routes/doacoes/getAllDonations";
import { createDonationLocal } from "../routes/locais_doacao/createDonateLocal";
import { getDonationLocalById } from "../routes/locais_doacao/getDonateLocal";
import { updateDonationLocal } from "../routes/locais_doacao/updateDonateLocal";
import { deleteDonationLocal } from "../routes/locais_doacao/deleteDonateLocal";
import { GetAllDonationsLocal } from "../routes/locais_doacao/getAllDonateLocal";

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
server.register(deletePersonRegister);
server.register(GetAllPersons);

// doacao
server.register(createDonation);
server.register(getDonationById);
server.register(updateDonation);
server.register(deleteDonation);
server.register(getAllDonations);

// locais coleta
server.register(createDonationLocal);
server.register(getDonationLocalById);
server.register(updateDonationLocal);
server.register(deleteDonationLocal);
server.register(GetAllDonationsLocal);

server.listen({ port: 3333 }).then(() => {
  console.log("server running");
});
("");
