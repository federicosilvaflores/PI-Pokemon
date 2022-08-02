import React from "react";
import s from "./Paginado.module.css";

export default function Paginado({ pokemonsPerPage, pokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={s.ulPaginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={s.listPaginado} key={number}>
              <button
                className={s.buttonPaginado}
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
