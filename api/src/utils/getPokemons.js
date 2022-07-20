const axios = require("axios");
const { Pokemon, Type } = require("../db");

//Traigo la info de la Api (40 pokemons)
const getApiInfo = async () => {
  const apiUrl = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
  );

  const dataUrl = await apiUrl.data.results.map((pokemon) => pokemon.url);

  const result = await Promise.all(dataUrl.map(axios.get));

  const resultFinal = result.map((pokemon) => {
    return {
      id: pokemon.data.id,
      name: pokemon.data.name,
      hp: pokemon.data.stats[0].base_stat,
      attack: pokemon.data.stats[1].base_stat,
      defense: pokemon.data.stats[2].base_stat,
      speed: pokemon.data.stats[5].base_stat,
      height: pokemon.data.height,
      weight: pokemon.data.weight,
      img: pokemon.data.sprites.other.dream_world.front_default,
      types: pokemon.data.types.map((type) => {
        return {
          name: type.type.name,
        };
      }),
    };
  });

  return resultFinal;
};

//Traigo la info de la base de datos
const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//Concateno los resultados
const getTotalInfo = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = await apiInfo.concat(dbInfo);
  return infoTotal;
};

module.exports = { getTotalInfo };
