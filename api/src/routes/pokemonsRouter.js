const { default: axios } = require("axios");
const { Router } = require("express");
const { getTotalInfo } = require("../utils/getPokemons");
const { Type, Pokemon } = require("../db");

const pokemonsRouter = Router();

pokemonsRouter.get("/", async (req, res) => {
  const { name } = req.query;
  const totalInfo = await getTotalInfo();
  try {
    //Si no recibo name por query
    if (!name) {
      res.status(200).send(totalInfo);
    }
    //Si recibo name por query pero es un "number" (ya que el endpoint de la API tambien trae pokemons por ID)
    if (name) {
      if (name * 1 === Number(name)) {
        return res.status(404).send("Not Found");
      }
      //Si no es un number lo filtro desde el array inicial que trae pokemons de la BD y 40 de la API
      const pokemonName = await totalInfo.filter(
        (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
      );
      if (pokemonName.length) {
        res.status(200).send(pokemonName);
      }
      //Si no lo encuentro entre esos hago un nuevo pedido a la API buscando por name
      if (!pokemonName.length) {
        const pokemonApi = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        const pokemonApi2 = {
          id: pokemonApi.data.id,
          name: pokemonApi.data.name,
          hp: pokemonApi.data.stats[0].base_stat,
          attack: pokemonApi.data.stats[1].base_stat,
          defense: pokemonApi.data.stats[2].base_stat,
          speed: pokemonApi.data.stats[5].base_stat,
          height: pokemonApi.data.height,
          weight: pokemonApi.data.weight,
          img: pokemonApi.data.sprites.other.dream_world.front_default,
          types: pokemonApi.data.types.map((type) => {
            return {
              name: type.type.name,
            };
          }),
        };
        res.status(200).send(pokemonApi2);
      }
    }
    //Atrapo el error 404 y mando la respuesta
  } catch (error) {
    //console.log(error.response.statusText);
    res.status(404).send(error.response.statusText);
  }
});

pokemonsRouter.post("/", async (req, res) => {
  //Recibo objeto por body
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
    types,
    createdInDb,
  } = req.body;
  try {
    const pokemonCreated = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
      createdInDb,
    });

    let typesDb = await Type.findAll({
      where: { name: types },
    });
    pokemonCreated.addTypes(typesDb);
    res.status(200).send("Pokemon creado con exito");
  } catch (error) {
    console.log("Falló la ruta del Post");
  }
});

pokemonsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //Verifico que el id no incluya guiones y que sea un Number y lo traigo de el endpoint de la API
    if (!id.includes("-") && id * 1 === Number(id)) {
      const pokemonApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const pokemonApi2 = {
        id: pokemonApi.data.id,
        name: pokemonApi.data.name,
        hp: pokemonApi.data.stats[0].base_stat,
        attack: pokemonApi.data.stats[1].base_stat,
        defense: pokemonApi.data.stats[2].base_stat,
        speed: pokemonApi.data.stats[5].base_stat,
        height: pokemonApi.data.height,
        weight: pokemonApi.data.weight,
        img: pokemonApi.data.sprites.other.dream_world.front_default,
        types: pokemonApi.data.types.map((type) => {
          return {
            name: type.type.name,
          };
        }),
      };
      res.status(200).send(pokemonApi2);
    } else {
      //sino lo busco en la base de datos
      const db = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ["name"],
        },
      });
      res.status(200).send(db);
    }
  } catch (error) {
    res.status(404).send("Not Found");
  }
});

module.exports = pokemonsRouter;
