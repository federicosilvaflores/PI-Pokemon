import s from "./Detail.module.css";
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
    <div className={s.divContenedor}>
      {Object.entries(myPokemon).length ? (
        <div className={s.divCard}>
          <h1 className={s.nombre}>
            {myPokemon.name[0].toUpperCase() + myPokemon.name.substring(1)}
          </h1>
          <img
            className={s.img}
            src={
              myPokemon.img === null || myPokemon.img === ""
                ? "https://st4.depositphotos.com/1069957/19981/i/450/depositphotos_199815936-stock-photo-pokemon-ball-on-wooden-background.jpg"
                : myPokemon.img
            }
            alt="img not found"
            width="380px"
            height="250px"
          />
          <h5 className={s.tiposEstadisticasEtc}>Tipo/s:</h5>
          {myPokemon.types?.map((type) => {
            return (
              <h6 className={s.tiposPoke} key={type.name}>
                ▸ {type.name[0].toUpperCase() + type.name.substring(1)}
              </h6>
            );
          })}
          <h5 className={s.tiposEstadisticasEtc}>ID: {myPokemon.id}</h5>
          <h5 className={s.tiposEstadisticasEtc}>Estadisticas:</h5>
          <h6 className={s.estadisticas}>⁃ Vida: {myPokemon.hp}</h6>
          <h6 className={s.estadisticas}>⁃ Ataque: {myPokemon.attack}</h6>
          <h6 className={s.estadisticas}>⁃ Defensa: {myPokemon.defense}</h6>
          <h6 className={s.estadisticas}>⁃ Velocidad: {myPokemon.speed}</h6>
          <h5 className={s.tiposEstadisticasEtc}>
            Altura: {myPokemon.height}{" "}
          </h5>
          <h5 className={s.tiposEstadisticasEtc}>Peso: {myPokemon.weight}</h5>
        </div>
      ) : errorDeDetail === "" ? (
        <div className={s.loader}></div>
      ) : (
        <p className={s.error}>No existe pokemon con ese ID</p>
      )}

      <Link to="/home">
        <button className={s.button}>Volver</button>
      </Link>
    </div>
  );
}
