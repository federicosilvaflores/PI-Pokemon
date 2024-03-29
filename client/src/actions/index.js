import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_BY = "ORDER_BY";
export const GET_NAME_POKEMONS = "GET_NAME_POKEMONS";
export const POST_POKEMON = "POST_POKEMON";
export const GET_DETAIL = "GET_DETAIL";
export const GET_CLEAN_DETAIL_STATE = "GET_CLEAN_DETAIL_STATE";

export function getPokemons() {
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons")
      .then((respuesta) => respuesta.json())
      .then((respuestaJson) =>
        dispatch({
          type: GET_POKEMONS,
          payload: respuestaJson,
        })
      );
  };
}

export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: GET_TYPES,
      payload: json.data,
    });
  };
}

export function filterPokemonsByType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
}

export function filterPokemonsByCreated(payload) {
  return {
    type: FILTER_BY_CREATED,
    payload,
  };
}

export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload,
  };
}

export function getNamePokemons(name) {
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons?name=" + name)
      .then((respuesta) => respuesta.json())
      .then((respuestaJson) =>
        dispatch({
          type: GET_NAME_POKEMONS,
          payload: respuestaJson,
        })
      )
      .catch((error) => {
        console.log(error);
        alert("Pokemon no encontrado");
        return dispatch({
          type: "ERROR_POKEMON_NOT_FOUND",
          payload: false,
        });
      });
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const json = await axios.post("http://localhost:3001/pokemons", payload);
    return json;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/pokemons/" + id);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data,
      });
    } catch (errorDeDetail) {
      return dispatch({
        type: "DETAIL_ERROR",
        payload: "Existe error en get de Detail",
      });
    }
  };
}

export function getCleanDetailState() {
  return {
    type: GET_CLEAN_DETAIL_STATE,
    payload: [],
  };
}

export function getCleanErrorDetailState() {
  return {
    type: "GET_CLEAN_ERROR_DETAIL_STATE",
    payload: "",
  };
}

export function getCleanFiltersStates() {
  return {
    type: "GET_CLEAN_FILTERS_STATE",
    payload: "",
  };
}

export function getCleanStatePokemonsOnSearch() {
  return {
    type: "GET_CLEAN_STATE_POKEMONS_ON_SEARCH",
    payload: [],
  };
}
