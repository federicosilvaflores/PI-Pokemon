import s from "./SearchBar.module.css";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCleanStatePokemonsOnSearch, getNamePokemons } from "../actions";

export default function SearchBar({ currentPage, setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCleanStatePokemonsOnSearch());
    dispatch(getNamePokemons(name));
    setCurrentPage(1);
    setName("");
  }

  return (
    <div className={s.divContenedor}>
      <input
        className={s.inputSearch}
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="Buscar pokemon por nombre..."
        value={name}
      />
      <button className={s.buttonSearch} onClick={(e) => handleSubmit(e)} type="submit">
        Buscar
      </button>
      {}
    </div>
  );
}
