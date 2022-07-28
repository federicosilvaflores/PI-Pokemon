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
} from "../actions";
import { Link } from "react-router-dom";
//importo los componentes que voy a usar
import Card from "./Card";
import SearchBar from "./SearchBar";



//COMIENZO EL COMPONENTE
export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);
  const [orden, setOrden] = useState("");

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
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
        {pokemons &&
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
          })}
      </div>
    </div>
  );
}
