const { Router } = require("express");
const getTypesApi = require("../utils/getTypes");
const { Type } = require("../db");

const typesRouter = Router();

typesRouter.get("/", async (req, res) => {
  //Traigo todos los types de la API
  const typesApi = await getTypesApi();
  for (let i = 0; i < typesApi.length; i++) {
    Type.findOrCreate({ where: { name: typesApi[i] } });
  }
  const allTypes = await Type.findAll();
  res.send(allTypes);
});

module.exports = typesRouter;
