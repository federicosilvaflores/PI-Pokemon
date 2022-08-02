import React from "react";
import s from "./Card.module.css";

export default function Card({ name, img, types }) {
  return (
    <div className={s.divContenedor}>
      <div className={s.divImagenYTitulo}>
        <h3 className={s.nombrePokemon}>
          {name[0].toUpperCase() + name.substring(1)}
        </h3>
        <img
          className={s.imgCards}
          src={
            img === null || img === ""
              ? "https://st4.depositphotos.com/1069957/19981/i/450/depositphotos_199815936-stock-photo-pokemon-ball-on-wooden-background.jpg"
              : img
          }
          alt="img not found"
          width="380px"
          height="250px"
        />
      </div>
      <h5 className={s.tipos}>Tipo/s:</h5>
      {types?.map((type) => {
        return (
          <h6 className={s.tiposPoke} key={type.name}>
            ▸ {type.name[0].toUpperCase() + type.name.substring(1)}
          </h6>
        );
      })}
    </div>
  );
}
