import s from "./Home.module.css";
import logo from "../images/pokemonLogo.png";
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
    setCurrentPage(1);
    window.location.reload();
  }

  function handleFilterType(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    setCurrentPage(1);
    e.preventDefault();
    dispatch(filterPokemonsByCreated(e.target.value));
  }

  function handleSort(e) {
    setCurrentPage(1);
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }
  console.log(orden);
  //console.log("Current pokemons:", currentPokemons);
  //console.log("Estado de pokemons de Redux:", pokemons);
  //console.log("current page:", currentPage);

  return (
    <div>
      <div className={s.divContenedorHome}>
        <div className={s.divTitulo}>
          <button
            className={s.buttonReload}
            onClick={(e) => {
              handleClickReload(e);
            }}
          >
            🗘 Recargar
          </button>
          <img className={s.titulo} src={logo} alt="" />

          <Link className={s.crearPokemon} to="/pokemon">
            CREA TU POKEMON
          </Link>
        </div>

        <div className={s.divOrdenyFiltros}>
          <select
            onChange={(e) => handleSort(e)}
            defaultValue="opcionimaginaria"
          >
            <option id={s.ordenar} value="opcionimaginaria" disabled>
              Ordenar
            </option>
            <optgroup label="Alfabeticamente">
              <option value="AtoZ">A - Z</option>
              <option value="ZtoA">Z - A</option>
            </optgroup>
            <optgroup label="Por Ataque">
              <option value="mayorAMenor">Más fuerte a más débil</option>
              <option value="menorAmayor">Más débil a más fuerte</option>
            </optgroup>
          </select>

          <select
            onChange={(e) => handleFilterType(e)}
            defaultValue="opcionimaginaria"
          >
            <option id={s.ordenar} value="opcionimaginaria" disabled>
              Filtrar por tipo
            </option>
            <option value="All">Todos</option>
            {allTypes?.map((type) => {
              return (
                <option key={type.name} value={type.name}>
                  {type.name[0].toUpperCase() + type.name.substring(1)}
                </option>
              );
            })}
          </select>

          <select
            defaultValue="opcionimaginaria"
            name="created"
            onChange={(e) => handleFilterCreated(e)}
          >
            <option id={s.ordenar} value="opcionimaginaria" disabled>
              Filtrar por creados
            </option>
            <option value="All">Todos</option>
            <option value="created">Creados</option>
            <option value="api">Existentes</option>
          </select>
        </div>

        <SearchBar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
      <div className={s.divCards}>
        {loaderInicial === true ? (
          <p>
            <div className={s.loader}></div>
          </p>
        ) : (
          <p></p>
        )}
        {currentPokemons?.map((pokemon) => {
          return (
            <div key={pokemon.id}>
              <Link target="_blank" to={"/home/" + pokemon.id}>
                <Card
                  name={pokemon.name}
                  img={pokemon.img}
                  types={pokemon.types}
                />
              </Link>
            </div>
          );
        })}

        {pokemonsPorTipo === "No hay pokemons con ese tipo" ? (
          <p className={s.error}>No se encontraron pokemons</p>
        ) : (
          <p></p>
        )}
        {pokemonsCreados === "No hay pokemons creados" ? (
          <p className={s.error}>Todavia no se han creado pokemons</p>
        ) : (
          <p></p>
        )}
      </div>
      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        pokemons={pokemons.length}
        paginado={paginado}
      ></Paginado>

      <div className={s.numeroDePagina}>
        <p className={s.pNumPag}>Pag. {currentPage}</p>
      </div>
    </div>
  );
}
