import React from "react";

export default function Card({ name, img, types }) {
  return (
    <div>
      <h3>{name[0].toUpperCase() + name.substring(1)}</h3>
      <img
        src={
          img === null || img === ""
            ? "https://st4.depositphotos.com/1069957/19981/i/450/depositphotos_199815936-stock-photo-pokemon-ball-on-wooden-background.jpg"
            : img
        }
        alt="img not found"
        width="380px"
        height="250px"
      />
      <h5>Tipo/s:</h5>
      {types?.map((type) => {
        return (
          <h6 key={type.name}>
            {type.name[0].toUpperCase() + type.name.substring(1)}
          </h6>
        );
      })}
    </div>
  );
}
