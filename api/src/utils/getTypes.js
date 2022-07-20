const axios = require("axios");

const getTypesApi = async () => {
  const apiUrl = await axios.get("https://pokeapi.co/api/v2/type");
  const typesInfo = await apiUrl.data.results.map((type) => {
    return {
      name: type.name,
    };
  });
  return typesInfo.map((type) => {
    return type.name;
  });
};

module.exports = getTypesApi;
