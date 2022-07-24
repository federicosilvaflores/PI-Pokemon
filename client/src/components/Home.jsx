import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  return (
    <div>
      <Link to="/pokemon">Crear Pokemon</Link>
      <h1>PAGINA DE POKEMONS</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Vover a cargar Pokemons
      </button>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="ver">Aca van options de los tipos de pokemon</option>
        </select>
        <select>
          <option value="Todos">Todos</option>
          <option value="Creados">Creados</option>
          <option value="Api">De la API</option>
        </select>
        {allPokemons &&
          allPokemons.map((pokemon) => {
            return (
              <Link to={"/home/" + pokemon.id}>
                <Card
                  key={pokemon.id}
                  name={pokemon.name}
                  img={pokemon.img}
                  types={pokemon.types}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
}
