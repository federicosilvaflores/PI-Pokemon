import React from "react";
//importo los hooks que voy a usar de react
import { useState, useEffect } from "react";
//importo los hooks de react-redux
import { useDispatch, useSelector } from "react-redux";
//importo las actions que voy a usar en este componente
import {
  getPokemons,
  getTypes,
  filterPokemonsByType,
  filterPokemonsByCreated,
  orderBy,
  getCleanFiltersStates,
} from "../actions";
import { Link } from "react-router-dom";
//importo los componentes que voy a usar
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";

//COMIENZO EL COMPONENTE
export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);
  const loaderInicial = useSelector((state) => state.loaderInicial);
  const pokemonsPorTipo = useSelector((state) => state.filterByType);
  const pokemonsCreados = useSelector((state) => state.filterByCreated);
  const [orden, setOrden] = useState("");

  //  Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  // /Paginado

  function paginado(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
    return () => dispatch(getCleanFiltersStates());
  }, [dispatch]);

  function handleClickReload(e) {
    e.preventDefault();
    window.location.reload();
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterPokemonsByCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  console.log("Current pokemons:", currentPokemons);
  console.log("Estado de pokemons de Redux:", pokemons);

  return (
    <div>
      <Link to="/pokemon">Crear Pokemon</Link>
      <h1>PAGINA DE POKEMONS</h1>
      <button
        onClick={(e) => {
          handleClickReload(e);
        }}
      >
        Recargar
      </button>
      <SearchBar />
      <div>
        <label htmlFor="ordenamiento">Ordenar:</label>
        <select onChange={(e) => handleSort(e)} defaultValue="opcionimaginaria">
          <option value="opcionimaginaria" disabled>
            Alfabeticamente/Por Ataque
          </option>
          <optgroup label="Alfabeticamente">
            <option value="AtoZ">A - Z</option>
            <option value="ZtoA">Z - A</option>
          </optgroup>
          <optgroup label="Por Ataque">
            <option value="mayorAMenor">Mayor a menor</option>
            <option value="menorAmayor">Menor a mayor</option>
          </optgroup>
        </select>
        <label htmlFor="filtroPorTipo">Filtar por Tipo:</label>
        <select onChange={(e) => handleFilterType(e)}>
          <option value="All">Todos</option>
          {allTypes?.map((type) => {
            return (
              <option key={type.name} value={type.name}>
                {type.name[0].toUpperCase() + type.name.substring(1)}
              </option>
            );
          })}
        </select>
        <label htmlFor="filtroPorCreados">
          Filtrar por existentes o creados:
        </label>
        <select name="created" onChange={(e) => handleFilterCreated(e)}>
          <option value="All">Todos</option>
          <option value="created">Creados</option>
          <option value="api">Existentes</option>
        </select>

        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          pokemons={pokemons.length}
          paginado={paginado}
        ></Paginado>
        {currentPokemons.length !== 0 ? (
          currentPokemons.map((pokemon) => {
            return (
              <div key={pokemon.id}>
                <Link to={"/home/" + pokemon.id}>
                  <Card
                    name={pokemon.name}
                    img={pokemon.img}
                    types={pokemon.types}
                  />
                </Link>
              </div>
            );
          })
        ) : currentPokemons.length === 0 && pokemons.length > 0 ? (
          pokemons.map((pokemon) => {
            return (
              <div key={pokemon.id}>
                <Link to={"/home/" + pokemon.id}>
                  <Card
                    name={pokemon.name}
                    img={pokemon.img}
                    types={pokemon.types}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <p></p>
        )}

        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          pokemons={pokemons.length}
          paginado={paginado}
        ></Paginado>

        {loaderInicial === true ? <p>Cargando...</p> : <p></p>}
        {pokemonsPorTipo === "No hay pokemons con ese tipo" ? (
          <p>No se encontraron pokemons</p>
        ) : (
          <p></p>
        )}
        {pokemonsCreados === "No hay pokemons creados" ? (
          <p>Todavia no se han creado pokemons</p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
