import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetail,
  getCleanDetailState,
  getCleanErrorDetailState,
} from "../actions";
import { useEffect } from "react";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => dispatch(getCleanDetailState());
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    return () => dispatch(getCleanErrorDetailState());
  }, [dispatch, props.match.params.id]);

  const myPokemon = useSelector((state) => state.detail);
  const errorDeDetail = useSelector((state) => state.errorDeDetail);

  return (
    <div>
      {Object.entries(myPokemon).length ? (
        <div>
          <h1>
            {myPokemon.name[0].toUpperCase() + myPokemon.name.substring(1)}
          </h1>
          <img
            src={
              myPokemon.img === null || myPokemon.img === ""
                ? "https://st4.depositphotos.com/1069957/19981/i/450/depositphotos_199815936-stock-photo-pokemon-ball-on-wooden-background.jpg"
                : myPokemon.img
            }
            alt="img not found"
            width="380px"
            height="250px"
          />
          <h5>Tipo/s:</h5>
          {myPokemon.types?.map((type) => {
            return (
              <h6 key={type.name}>
                {type.name[0].toUpperCase() + type.name.substring(1)}
              </h6>
            );
          })}
          <h5>ID: {myPokemon.id}</h5>
          <h5>Estadisticas:</h5>
          <h6>Vida: {myPokemon.hp}</h6>
          <h6>Ataque: {myPokemon.attack}</h6>
          <h6>Defensa: {myPokemon.defense}</h6>
          <h6>Velocidad: {myPokemon.speed}</h6>
          <h5>Altura: {myPokemon.height} </h5>
          <h5>Peso: {myPokemon.weight}</h5>
        </div>
      ) : errorDeDetail === "" ? (
        <p>Cargando...</p>
      ) : (
        <p>No existe pokemon con ese ID</p>
      )}

      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
