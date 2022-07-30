import {
  GET_POKEMONS,
  GET_TYPES,
  FILTER_BY_TYPE,
  FILTER_BY_CREATED,
  ORDER_BY,
  GET_NAME_POKEMONS,
  POST_POKEMON,
  GET_DETAIL,
  GET_CLEAN_DETAIL_STATE,
} from "../actions";

const initialState = {
  pokemons: [],
  types: [],
  allPokemons: [],
  detail: [],
  errorDeDetail: "",
  loaderInicial: true,
  filterByType: "",
  filterByCreated: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        loaderInicial: state.pokemons === [] ? true : false,
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
        pokemons: statusFiltered,
        filterByType:
          statusFiltered.length !== 0
            ? "Hay pokemons con ese tipo"
            : "No hay pokemons con ese tipo",
      };
    case FILTER_BY_CREATED:
      const createdFilter =
        action.payload === "created"
          ? state.allPokemons.filter((el) => el.createdInDb)
          : state.allPokemons.filter((el) => !el.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
        filterByCreated:
          createdFilter.length === 0
            ? "No hay pokemons creados"
            : "Hay pokemons creados",
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
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_CLEAN_DETAIL_STATE:
      return {
        ...state,
        detail: action.payload,
      };
    case "DETAIL_ERROR":
      return {
        ...state,
        errorDeDetail: action.payload,
      };
    case "GET_CLEAN_ERROR_DETAIL_STATE":
      return {
        ...state,
        errorDeDetail: action.payload,
      };
    case "GET_CLEAN_FILTERS_STATE":
      return {
        ...state,
        filterByCreated: action.payload,
        filterByType: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
