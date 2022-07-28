import {
  GET_POKEMONS,
  GET_TYPES,
  FILTER_BY_TYPE,
  FILTER_BY_CREATED,
  ORDER_BY,
  GET_NAME_POKEMONS,
  POST_POKEMON,
} from "../actions";

const initialState = {
  pokemons: [],
  types: [],
  allPokemons: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case FILTER_BY_TYPE:
      const allPokemons = state.allPokemons;
      const statusFiltered =
        action.payload === "All"
          ? allPokemons
          : // eslint-disable-next-line array-callback-return
            allPokemons.filter((el) => {
              for (let i = 0; i < el.types.length; i++) {
                if (el.types[i].name === action.payload) {
                  return el;
                }
              }
            });
      return {
        ...state,
        pokemons:
          statusFiltered.length === 0
            ? alert("No se encontraron pokemons con ese tipo")
            : statusFiltered,
      };
    case FILTER_BY_CREATED:
      const createdFilter =
        action.payload === "created"
          ? state.allPokemons.filter((el) => el.createdInDb)
          : state.allPokemons.filter((el) => !el.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
      };
    case ORDER_BY:
      var sortedArr;
      if (action.payload === "AtoZ") {
        sortedArr = state.pokemons.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "ZtoA") {
        sortedArr = state.pokemons.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "mayorAMenor") {
        sortedArr = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return -1;
          }
          if (b.attack > a.attack) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "menorAmayor") {
        sortedArr = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return 1;
          }
          if (b.attack > a.attack) {
            return -1;
          }
          return 0;
        });
      }

      return {
        ...state,
        pokemons: sortedArr,
      };
    case GET_NAME_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case POST_POKEMON:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
